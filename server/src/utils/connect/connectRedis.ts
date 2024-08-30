import { createClient, RedisClientType } from "redis";
import { logger } from "../logger";

const redisUrl = "redis://localhost:6379";
const redisClient: RedisClientType = createClient({ url: redisUrl });

let retryDelay = 1000;
const maxRetryDelay = 60000;

async function connectRedis() {
  try {
    await redisClient.connect();
    logger.info("Redis client connected...");
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
      retryDelay = Math.min(retryDelay * 2, maxRetryDelay);
      setTimeout(connectRedis, retryDelay);
    }
  }
}

connectRedis();

redisClient.on("error", (err) => logger.error(err.message));

export default redisClient;
