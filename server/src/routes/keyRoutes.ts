import express, { Request, Response } from "express";
import config from "config";

const router = express.Router();

router.get("/paypal", (req: Request, res: Response) => {
  res.json({ clientId: config.get("payPalClientId") } || "sb");
});

export default router;
