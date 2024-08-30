import express from "express";
import validateSchema from "../middlewares/validateSchema";
import { createGanjaSchema, getGanjaSchema } from "../schemas/ganjaSchema";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";
import { restrictTo } from "../middlewares/restrictTo";
import reviewRouter from "./reviewRoutes";
import {
  createGanjaHandler,
  getAllGanjasHandler,
  getGanjaHandler,
} from "../controllers/ganjaController";

const router = express.Router({ mergeParams: true });

router.use("/:ganjaId/reviews", reviewRouter);

router
  .route("/")
  .post([
    tokenProtect,
    requireUser,
    restrictTo("admin"),
    validateSchema(createGanjaSchema),
    createGanjaHandler,
  ])
  .get(getAllGanjasHandler);

router.route("/:ganjaId").get(validateSchema(getGanjaSchema), getGanjaHandler);

export default router;
