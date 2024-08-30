require("dotenv").config();
import express, { urlencoded } from "express";
import { corsOptions } from "./utils/options";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import config from "config";
import { logger } from "./utils/logger";
import connectDb from "./utils/connect/connectDb";
import path from "path";
import cookeParser from "cookie-parser";

import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import ganjaRouter from "./routes/ganjaRoutes";
import categoryRouter from "./routes/categoryRoutes";
import orderRouter from "./routes/orderRoutes";
import reviewRouter from "./routes/reviewRoutes";
import keyRouter from "./routes/keyRoutes";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(corsOptions);
app.use(express.json({ limit: "10kb" }));
app.use(urlencoded({ extended: true }));
app.use(cookeParser());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "status code 429 - To many requests from this IP address!",
});
app.use("/api", limiter);

const port = config.get<string>("port");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/ganjas", ganjaRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/keys", keyRouter);

app.listen(port, () => {
  logger.info(`App is runnig on port http://localhost:${port}`);
  connectDb();
});
