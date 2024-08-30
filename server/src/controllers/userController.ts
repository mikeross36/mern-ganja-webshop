import { Request, Response, NextFunction } from "express";
import {
  findAllUsers,
  findUserAndDelete,
  findUserAndUpdate,
  findUserById,
} from "../services/userService";
import redisClient from "../utils/connect/connectRedis";

export function getLoggedInUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user;
    return res.status(200).json({ status: "succes", data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getAllUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await findAllUsers();
    return res
      .status(200)
      .json({ status: "success", result: users.length, data: { users } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.userId || typeof req.params.userId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid users's ID" });
    }
    const user = await findUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "success", data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function updateUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUserAndUpdate(req.params.userId, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function deleteUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.userId || typeof req.params.userId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid user's ID" });
    }
    const user = await findUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await redisClient.del(user.toString());
      await findUserAndDelete(req.params.userId);
      return res.status(204).json({ message: "User successfully deleted" });
    }
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function deleteMeHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.userId || typeof req.params.userId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid user's ID" });
    }
    await findUserAndUpdate(req.params.userId, { active: false });
    return res.status(204).json(null);
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getUserProfileHandler() {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.params.userId = req.user._id;
    next();
  };
}
export async function updateUserAccountHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUserById(req.user._id);
    if (!user) {
      return res
        .status(400)
        .json({ status: "errro", message: "Failed to update user's account" });
    } else {
      user.userName = req.body.userName || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();
      return res.status(200).json({
        status: "success",
        message: "User's account successfully updateted",
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
    return next(new Error("An unknown error occured"));
  }
}
