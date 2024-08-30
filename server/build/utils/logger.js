"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
};
exports.logger = (0, pino_1.default)({ customLevels: levels, base: { pid: false } }, (0, pino_pretty_1.default)({ colorize: true }));
