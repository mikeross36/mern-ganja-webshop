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
require("dotenv").config();
const express_1 = __importStar(require("express"));
const options_1 = require("./utils/options");
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = __importDefault(require("config"));
const logger_1 = require("./utils/logger");
const connectDb_1 = __importDefault(require("./utils/connect/connectDb"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ganjaRoutes_1 = __importDefault(require("./routes/ganjaRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const keyRoutes_1 = __importDefault(require("./routes/keyRoutes"));
const app = (0, express_1.default)();
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(options_1.corsOptions);
app.use(express_1.default.json({ limit: "10kb" }));
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "status code 429 - To many requests from this IP address!",
});
app.use("/api", limiter);
const port = config_1.default.get("port");
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/ganjas", ganjaRoutes_1.default);
app.use("/api/v1/categories", categoryRoutes_1.default);
app.use("/api/v1/orders", orderRoutes_1.default);
app.use("/api/v1/reviews", reviewRoutes_1.default);
app.use("/api/v1/keys", keyRoutes_1.default);
app.listen(port, () => {
    logger_1.logger.info(`App is runnig on port http://localhost:${port}`);
    (0, connectDb_1.default)();
});
