import { Request, Response, NextFunction } from "express";
import {
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
  UpdatePasswordInput,
  VerifyUserInput,
} from "../schemas/authSchema";
import { createUser, findUser, findUserById } from "../services/userService";
import { MongoError } from "mongodb";
import config from "config";
import Email from "../utils/mailer";
import { User } from "../models/userModel";
import crypto from "crypto";
import { generateToken } from "../services/authService";
import {
  accessTokenCookieOptions,
  refreshTokenCookeOptions,
} from "../utils/options";
import { signJwt, verifyJwt } from "../utils/jwtUtils";
import redisClient from "../utils/connect/connectRedis";
import { logger } from "../utils/logger";

const devOrigin = config.get<string>("devOrigin");
const prodOrigin = config.get<string>("prodOrigin");

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUser(req.body);
    const verificationCode = user.createVerificationCode();
    user.save({ validateBeforeSave: false });

    const url =
      process.env.NODE_ENV === "development"
        ? `${devOrigin}/verify/${user._id}/${verificationCode}`
        : `${prodOrigin}/verify/${user._id}/${verificationCode}`;

    try {
      await new Email(user as unknown as User, url).sendWelcomeEmail();
      return res.status(201).json({
        status: "succes",
        message:
          "User successfuly registered. Check your email to verify account",
        data: { user },
      });
    } catch (err) {
      user.verificationCode = null;
      await user.save();
      return res.status(500).json({
        message: "There was an error sending email. Please try again",
      });
    }
  } catch (err) {
    if (err instanceof MongoError && err.code === 11000) {
      return res
        .status(409)
        .json({ status: "failed", message: "Account already exists" });
    }
    return next(err);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const verificationCode = crypto
      .createHash("sha256")
      .update(req.params.verificationCode)
      .digest("hex");

    const user = await findUser({ verificationCode });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.userVerified) {
      return res
        .status(400)
        .json({ message: "User's account already verified" });
    }
    user.userVerified = true;
    user.verificationCode = null;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Account verified successfully. Please login to continue.",
    });
  } catch (err) {
    return next(err);
  }
}

export async function loginUserHandler(
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const message = "Invalid email or password";
    const user = await findUser({ email: req.body.email });
    if (!user || !(await user.matchPasswords(req.body.password))) {
      return res.status(401).json({ message: message });
    }
    if (user.userVerified === "false") {
      return res
        .status(401)
        .json({ message: "User's account is not verified" });
    }

    const { accessToken, refreshToken } = generateToken(user as Partial<User>);

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookeOptions);
    res.cookie("loggedIn", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      accessToken,
    });
  } catch (err) {
    return next(err);
  }
}

export async function refreshAccessTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = req.cookies.refreshToken;

    const verified = verifyJwt<{ sub: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );
    const message = "Failed to refresh access token";
    if (!verified) {
      return res.status(403).json({ message: message });
    }

    const session = await redisClient.get(verified.sub);
    if (!session) {
      return res.status(403).json({ message: message });
    }

    const user = await findUserById(JSON.parse(session)._id);
    if (!user) {
      return res.status(403).json({ message: message });
    }

    const accessToken = signJwt({ sub: user._id }, "accessTokenPrivateKey", {
      expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
    });

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("loggedIn", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.status(200).json({ status: "success", accessToken });
  } catch (err) {
    next(err);
  }
}

function logout(res: Response) {
  res.clearCookie("accessToken", {
    expires: new Date(
      Date.now() + config.get<number>("accessTokenExpiresIn") * 1
    ),
    maxAge: 1,
    httpOnly: true,
  });
  res.clearCookie("refreshToken", {
    expires: new Date(
      Date.now() + config.get<number>("refreshTokenExpiresIn") * 1
    ),
    maxAge: 1,
    httpOnly: true,
  });
  res.cookie("logged_in", "", {
    maxAge: 1,
  });
}

export async function logoutUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user;
    if (!user || !user._id) {
      return res
        .status(400)
        .json({ status: "error", message: "User info is invalid or missing" });
    }
    try {
      await redisClient.del(user._id.toString());
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Redis error during logout: ${err.message}`);
        return res.status(500).json({
          status: "error",
          message: "Error occurred while clearing the session",
        });
      }
      throw err;
    }
    try {
      logout(res);
      return res.status(200).json({ status: "success", message: "LOGGED OUT" });
    } catch (err: any) {
      logger.error(`Error sending response cookies: ${err.message}`);
      return res
        .status(500)
        .json({ status: "error", message: "Error occurred while logout" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function forgotPasswordHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const message =
      "You will receive a password reset email if user with that email exists";
    const user = await findUser({ email: req.body.email });
    if (!user) {
      return res.status(403).json({ message: message });
    }
    if (!user.userVerified) {
      return res.status(403).json({ message: "User not verified" });
    }

    const resetToken = user.createResetToken();
    await user.save();

    const resetUrl =
      process.env.NODE_ENV === "development"
        ? `${devOrigin}/reset-password/${resetToken}`
        : `${prodOrigin}/reset-password/${resetToken}`;

    try {
      await new Email(user as unknown as User, resetUrl).sendPasswordReset();
      return res.status(200).json({
        status: "success",
        message: "Password reset token sent by email",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetAt = undefined;
      await user.save();

      return res
        .status(500)
        .json({ message: "There was an error sending email" });
    }
  } catch (err) {
    return next(err);
  }
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const user = await findUser({
      passwordResetToken: passwordResetToken,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" });
    }
    user.password = req.body.password;
    user.passwordResetToken = null;
    user.passwordResetAt = null;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password successfully reset. Please login with new password",
    });
  } catch (err) {
    return next(err);
  }
}

export async function updatePasswordHandler(
  req: Request<{}, {}, UpdatePasswordInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user;
    if (!user || !(await user.matchPasswords(req.body.currentPassword))) {
      return res.status(401).json({ message: "Invalid current password" });
    }
    user.password = req.body.password;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password updated successfully. Please login with new password",
    });
  } catch (err) {
    next(err);
  }
}
