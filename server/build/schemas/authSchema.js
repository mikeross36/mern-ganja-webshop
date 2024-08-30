"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginUserSchema = exports.verifyUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userName: (0, zod_1.string)({ required_error: "User name is required" }),
        email: (0, zod_1.string)({ required_error: "Email is required" }).email("Email is not valid"),
        password: (0, zod_1.string)({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 chars long")
            .max(24, "Password must not be longer then 24 chars"),
        confirmPassword: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }),
});
exports.verifyUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        userId: (0, zod_1.string)(),
        verificationCode: (0, zod_1.string)(),
    }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: "Eamil is required" }).email("Email is not valid"),
        password: (0, zod_1.string)({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 chars long")
            .max(24, "Password must not be longer then 24 chars"),
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: "Email is required" }).email("Email is not valid"),
    }),
});
exports.resetPasswordSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        resetToken: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 chars long")
            .max(24, "Password must not be longer then 24 chars"),
        confirmPassword: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match!",
        path: ["confirmPassword"],
    }),
});
exports.updatePasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        currentPassword: (0, zod_1.string)({ required_error: "Current password is required" })
            .min(8, "Password must be at least 8 chars long")
            .max(24, "Password must not be longer then 24 chars"),
        password: (0, zod_1.string)({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 chars long")
            .max(24, "Password must not be longer then 24 chars"),
        confirmPassword: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match!",
        path: ["confirmPassword"],
    }),
});
