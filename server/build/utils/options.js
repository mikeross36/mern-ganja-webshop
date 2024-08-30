"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookeOptions = exports.accessTokenCookieOptions = exports.corsOptions = void 0;
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
exports.corsOptions = (0, cors_1.default)({
    credentials: true,
    origin: [config_1.default.get("devOrigin"), config_1.default.get("prodOrigin")],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Access-Control-Allow-Origin",
    ],
});
exports.accessTokenCookieOptions = {
    expires: new Date(Date.now() + config_1.default.get("accessTokenExpiresIn") * 60 * 1000),
    maxAge: config_1.default.get("accessTokenExpiresIn") * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};
exports.refreshTokenCookeOptions = {
    expires: new Date(Date.now() + config_1.default.get("refreshTokenExpiresIn") * 60 * 1000),
    maxAge: config_1.default.get("refreshTokenExpiresIn") * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};
