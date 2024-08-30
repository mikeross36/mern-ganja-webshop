"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = requireUser;
const logger_1 = require("../utils/logger");
// middleware checks if the user exists on res.locals
function requireUser(req, res, next) {
    try {
        const user = res.locals.user;
        logger_1.logger.warn(`User ${user._doc.userName || "unknown"} exists on res.locals`);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid token or expired session" });
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            error: "Authentication failed",
            message: "Invalid token or expired session",
        });
    }
}
// export function requireUser(req: Request, res: Response, next: NextFunction) {
//   try {
//     const user = res.locals.user;
//     logger.info(user._doc._id);
//     // attaching _id to the request
//     if (user) {
//       req.user._id = user._doc._id;
//       logger.warn(
//         `User ${user._doc.userName} authenticated with ID: ${user._doc._id}`
//       );
//       next();
//     }
//     // including _id in the response
//     // if (user) {
//     //   res.locals.userId = user._doc._id;
//     //   logger.warn(
//     //     `User ${user._doc.userName} authenticated with ID: ${user._doc._id}`
//     //   );
//     //   next();
//     // }
//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Invalid token or expired session" });
//     }
//     next();
//   } catch (err) {
//     next(err);
//   }
// }
