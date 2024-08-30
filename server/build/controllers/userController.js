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
exports.getLoggedInUserInfo = getLoggedInUserInfo;
exports.getAllUsersHandler = getAllUsersHandler;
exports.getUserHandler = getUserHandler;
exports.updateUserHandler = updateUserHandler;
exports.deleteUserHandler = deleteUserHandler;
exports.deleteMeHandler = deleteMeHandler;
exports.getUserProfileHandler = getUserProfileHandler;
exports.updateUserAccountHandler = updateUserAccountHandler;
const userService_1 = require("../services/userService");
const connectRedis_1 = __importDefault(require("../utils/connect/connectRedis"));
function getLoggedInUserInfo(req, res, next) {
    try {
        const user = res.locals.user;
        return res.status(200).json({ status: "succes", data: { user } });
    }
    catch (err) {
        if (err instanceof Error) {
            return next(err);
        }
        return next(new Error("An unknown error occurred"));
    }
}
function getAllUsersHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userService_1.findAllUsers)();
            return res
                .status(200)
                .json({ status: "success", result: users.length, data: { users } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.userId || typeof req.params.userId !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid users's ID" });
            }
            const user = yield (0, userService_1.findUserById)(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "success", data: { user } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function updateUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userService_1.findUserAndUpdate)(req.params.userId, req.body);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ status: "success", data: { user } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function deleteUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.userId || typeof req.params.userId !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid user's ID" });
            }
            const user = yield (0, userService_1.findUserById)(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            else {
                yield connectRedis_1.default.del(user.toString());
                yield (0, userService_1.findUserAndDelete)(req.params.userId);
                return res.status(204).json({ message: "User successfully deleted" });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function deleteMeHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.userId || typeof req.params.userId !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid user's ID" });
            }
            yield (0, userService_1.findUserAndUpdate)(req.params.userId, { active: false });
            return res.status(204).json(null);
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getUserProfileHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.params.userId = req.user._id;
            next();
        });
    });
}
function updateUserAccountHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userService_1.findUserById)(req.user._id);
            if (!user) {
                return res
                    .status(400)
                    .json({ status: "errro", message: "Failed to update user's account" });
            }
            else {
                user.userName = req.body.userName || user.name;
                user.email = req.body.email || user.email;
                const updatedUser = yield user.save();
                return res.status(200).json({
                    status: "success",
                    message: "User's account successfully updateted",
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                next(err);
            }
            return next(new Error("An unknown error occured"));
        }
    });
}
