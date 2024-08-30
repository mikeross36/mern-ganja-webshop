import cors from "cors";
import config from "config";
import { CookieOptions } from "express";

export const corsOptions = cors({
  credentials: true,
  origin: [config.get<string>("devOrigin"), config.get<string>("prodOrigin")],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Access-Control-Allow-Origin",
  ],
});

export const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenCookeOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>("refreshTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};
