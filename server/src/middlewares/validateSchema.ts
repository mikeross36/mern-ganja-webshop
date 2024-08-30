import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { logger } from "../utils/logger";

const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (err: any) {
      logger.error(err.message);
      return res.status(400).send(err.errors);
    }
  };

export default validateSchema;
