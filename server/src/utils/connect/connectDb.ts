import mongoose from "mongoose";
import config from "config";
import { logger } from "../logger";

const dbUrl = `mongodb+srv://${config.get("dbUserName")}:${config.get(
  "dbUserPassword"
)}@cluster.yf46xbj.mongodb.net/${config.get(
  "dbName"
)}?retryWrites=true&w=majority`;

async function connectDb() {
  try {
    await mongoose.connect(dbUrl);
    logger.info("Database connected...");
  } catch (err: any) {
    logger.error(err.message, "Datbase connection failed");
    setTimeout(connectDb, 5000);
    process.exit(1);
  }
}

export default connectDb;
