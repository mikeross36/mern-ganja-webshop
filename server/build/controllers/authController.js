"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserHandler = registerUserHandler;
exports.verifyUserHandler = verifyUserHandler;
exports.loginUserHandler = loginUserHandler;
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
exports.logoutUserHandler = logoutUserHandler;
exports.forgotPasswordHandler = forgotPasswordHandler;
exports.resetPasswordHandler = resetPasswordHandler;
exports.updatePasswordHandler = updatePasswordHandler;
const userService_1 = require("../services/userService");
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("config"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const crypto_1 = __importDefault(require("crypto"));
const authService_1 = require("../services/authService");
const options_1 = require("../utils/options");
const jwtUtils_1 = require("../utils/jwtUtils");
const connectRedis_1 = __importDefault(require("../utils/connect/connectRedis"));
const devOrigin = config_1.default.get("devOrigin");
const prodOrigin = config_1.default.get("prodOrigin");
function registerUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userService_1.createUser)(req.body);
            const verificationCode = user.createVerificationCode();
            user.save({ validateBeforeSave: false });
            const url = process.env.NODE_ENV === "development"
                ? `${devOrigin}/verify/${user._id}/${verificationCode}`
                : `${prodOrigin}/verify/${user._id}/${verificationCode}`;
            try {
                yield new mailer_1.default(user, url).sendWelcomeEmail();
                return res.status(201).json({
                    status: "succes",
                    message: "User successfuly registered. Check your email to verify account",
                    data: { user },
                });
            }
            catch (err) {
                user.verificationCode = null;
                yield user.save();
                return res.status(500).json({
                    message: "There was an error sending email. Please try again",
                });
            }
        }
        catch (err) {
            if (err instanceof mongodb_1.MongoError && err.code === 11000) {
                return res
                    .status(409)
                    .json({ status: "failed", message: "Account already exists" });
            }
            return next(err);
        }
    });
}
function verifyUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const verificationCode = crypto_1.default
                .createHash("sha256")
                .update(req.params.verificationCode)
                .digest("hex");
            const user = yield (0, userService_1.findUser)({ verificationCode });
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
            yield user.save();
            return res.status(200).json({
                status: "success",
                message: "Account verified successfully. Please login to continue.",
            });
        }
        catch (err) {
            return next(err);
        }
    });
}
function loginUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = "Invalid email or password";
            const user = yield (0, userService_1.findUser)({ email: req.body.email });
            if (!user || !(yield user.matchPasswords(req.body.password))) {
                return res.status(401).json({ message: message });
            }
            if (user.userVerified === "false") {
                return res
                    .status(401)
                    .json({ message: "User's account is not verified" });
            }
            const { accessToken, refreshToken } = (0, authService_1.generateToken)(user.toObject());
            res.cookie("accessToken", accessToken, options_1.accessTokenCookieOptions);
            res.cookie("refreshToken", refreshToken, options_1.refreshTokenCookeOptions);
            res.cookie("loggedIn", true, Object.assign(Object.assign({}, options_1.accessTokenCookieOptions), { httpOnly: false }));
            return res.status(200).json({
                status: "success",
                message: "Logged in successfully",
                accessToken,
            });
        }
        catch (err) {
            return next(err);
        }
    });
}
function refreshAccessTokenHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // retrieve refresh tone fro the cookie
            const refreshToken = req.cookies.refreshToken;
            // verifying refresh token
            const verified = (0, jwtUtils_1.verifyJwt)(refreshToken, "refreshTokenPublicKey");
            const message = "Failed to refresh access token";
            if (!verified) {
                return res.status(403).json({ message: message });
            }
            // check if there is a valid session for user
            const session = yield connectRedis_1.default.get(verified.sub);
            if (!session) {
                return res.status(403).json({ message: message });
            }
            // check if the user exists
            const user = yield (0, userService_1.findUserById)(JSON.parse(session)._id);
            if (!user) {
                return res.status(403).json({ message: message });
            }
            // sign new access token
            const accessToken = (0, jwtUtils_1.signJwt)({ sub: user._id }, "accessTokenPrivateKey", {
                expiresIn: `${config_1.default.get("accessTokenExpiresIn")}m`,
            });
            // create new access token as http only cookie in order to reduce chances to be hacked!
            res.cookie("accessToken", accessToken, options_1.accessTokenCookieOptions);
            res.cookie("loggedIn", true, Object.assign(Object.assign({}, options_1.accessTokenCookieOptions), { httpOnly: false }));
            // send access token in the response body
            return res.status(200).json({ status: "success", accessToken });
        }
        catch (err) {
            next(err);
        }
    });
}
// to logout send expired access & refresh token cookies to the browser
function logout(res) {
    res.cookie("accessToken", "", { maxAge: 1 }),
        res.cookie("refreshToken", "", { maxAge: 1 }),
        res.cookie("loggedIn", "", { maxAge: 1 });
}
function logoutUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = res.locals.user;
            yield connectRedis_1.default.del(user._id.toString());
            logout(res);
            return res.status(200).json({ status: "success", message: "LOGGED OUT" });
        }
        catch (err) {
            next(err);
        }
    });
}
function forgotPasswordHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = "You will receive a password reset email if user with that email exists";
            const user = yield (0, userService_1.findUser)({ email: req.body.email });
            if (!user) {
                return res.status(403).json({ message: message });
            }
            if (!user.userVerified) {
                return res.status(403).json({ message: "User not verified" });
            }
            const resetToken = user.createResetToken();
            yield user.save();
            const resetUrl = process.env.NODE_ENV === "development"
                ? `${devOrigin}/reset-password/${resetToken}`
                : `${prodOrigin}/reset-password/${resetToken}`;
            try {
                yield new mailer_1.default(user, resetUrl).sendPasswordReset();
                return res.status(200).json({
                    status: "success",
                    message: "Password reset token sent by email",
                });
            }
            catch (err) {
                user.passwordResetToken = undefined;
                user.passwordResetAt = undefined;
                yield user.save();
                return res
                    .status(500)
                    .json({ message: "There was an error sending email" });
            }
        }
        catch (err) {
            return next(err);
        }
    });
}
function resetPasswordHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const passwordResetToken = crypto_1.default
                .createHash("sha256")
                .update(req.params.resetToken)
                .digest("hex");
            const user = yield (0, userService_1.findUser)({
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
            yield user.save();
            return res.status(200).json({
                status: "success",
                message: "Password successfully reset. Please login with new password",
            });
        }
        catch (err) {
            return next(err);
        }
    });
}
function updatePasswordHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = res.locals.user;
            if (!user || !(yield user.matchPasswords(req.body.currentPassword))) {
                return res.status(401).json({ message: "Invalid current password" });
            }
            user.password = req.body.password;
            yield user.save();
            return res.status(200).json({
                status: "success",
                message: "Password updated successfully. Please login with new password",
            });
        }
        catch (err) {
            next(err);
        }
    });
}
