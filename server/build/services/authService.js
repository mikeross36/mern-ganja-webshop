"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jwtUtils_1 = require("../utils/jwtUtils");
const config_1 = __importDefault(require("config"));
const connectRedis_1 = __importDefault(require("../utils/connect/connectRedis"));
function generateToken(user) {
    if (!user._id) {
        throw new Error("User ID is required");
    }
    const accessToken = (0, jwtUtils_1.signJwt)({ sub: user._id }, "accessTokenPrivateKey", {
        expiresIn: `${config_1.default.get("accessTokenExpiresIn")}m`,
    });
    const refreshToken = (0, jwtUtils_1.signJwt)({ sub: user._id }, "refreshTokenPrivateKey", {
        expiresIn: `${config_1.default.get("refreshTokenExpiresIn")}m`,
    });
    // create redis session
    connectRedis_1.default.set(user._id.toString(), JSON.stringify(user), { EX: 60 * 60 });
    return { accessToken, refreshToken };
}
