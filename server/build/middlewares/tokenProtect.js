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
exports.tokenProtect = tokenProtect;
const jwtUtils_1 = require("../utils/jwtUtils");
const connectRedis_1 = __importDefault(require("../utils/connect/connectRedis"));
const userService_1 = require("../services/userService");
function tokenProtect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let accessToken;
            if (req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")) {
                accessToken = req.headers.authorization.split(" ")[1];
            }
            else if (req.cookies.accessToken) {
                accessToken = req.cookies.accessToken;
            }
            if (!accessToken) {
                return res.status(401).json({ message: "You are not logged in!" });
            }
            const verified = (0, jwtUtils_1.verifyJwt)(accessToken, "accessTokenPublicKey");
            if (!verified) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }
            const session = yield connectRedis_1.default.get(verified.sub);
            if (!session) {
                return res.status(401).json({ message: "User session has expired" });
            }
            const user = yield (0, userService_1.findUserById)(JSON.parse(session)._id);
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "User with this token no longer exists" });
            }
            req.user = user;
            res.locals.user = user;
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
}
