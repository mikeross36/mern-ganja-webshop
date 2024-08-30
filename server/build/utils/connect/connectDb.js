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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logger_1 = require("../logger");
const dbUrl = `mongodb+srv://${config_1.default.get("dbUserName")}:${config_1.default.get("dbUserPassword")}@cluster.yf46xbj.mongodb.net/${config_1.default.get("dbName")}?retryWrites=true&w=majority`;
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(dbUrl);
            logger_1.logger.info("Database connected...");
        }
        catch (err) {
            logger_1.logger.error(err.message, "Datbase connection failed");
            setTimeout(connectDb, 5000);
            process.exit(1);
        }
    });
}
exports.default = connectDb;
