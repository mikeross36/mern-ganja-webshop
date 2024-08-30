"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const logger_1 = require("./logger");
function signJwt(payload, key, options = {}) {
    try {
        const privateKey = Buffer.from(config_1.default.get(key), "base64").toString("ascii");
        return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256", allowInsecureKeySizes: true }));
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            logger_1.logger.error(err.message);
            throw new Error(`Error signing JWT: ${err.message}`);
        }
    }
}
function verifyJwt(token, key) {
    try {
        const publicKey = Buffer.from(config_1.default.get(key), "base64").toString("ascii");
        return jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            switch (err.name) {
                case "JsonWebTokenError": {
                    logger_1.logger.error(err.message);
                    throw new Error(`Invalid JWT: ${err.message}`);
                }
                case "TokenExpiredError": {
                    logger_1.logger.error(err.message);
                    throw new Error("JWT has been expired");
                }
                default:
                    logger_1.logger.error("Error occured while verofying the JWT");
                    throw new Error("An unknown error occured while verofying the JWT");
            }
        }
        else {
            throw new Error("An unknown error occured while verofying the JWT");
        }
    }
}
