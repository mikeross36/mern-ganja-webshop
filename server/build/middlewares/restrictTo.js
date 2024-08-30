"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = void 0;
const restrictTo = (...allowedRoles) => (req, res, next) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
        return res
            .status(403)
            .json({ message: "You are not allowed to perform this action" });
    }
    next();
};
exports.restrictTo = restrictTo;
