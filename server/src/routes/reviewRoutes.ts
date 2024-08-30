import express from "express";
import validateSchema from "../middlewares/validateSchema";
import {
  createReviewSchema,
  deleteReviewSchema,
  updateReviewSchema,
} from "../schemas/reviewSchema";
import {
  setGanjaAndUserIds,
  createReviewHandler,
  getAllReviewsHandler,
  getReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from "../controllers/reviewController";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviewsHandler)
  .post(
    tokenProtect,
    requireUser,
    validateSchema(createReviewSchema),
    setGanjaAndUserIds,
    createReviewHandler
  );

router.use(tokenProtect, requireUser);

router
  .route("/:reviewId")
  .get(getReviewHandler)
  .patch(validateSchema(updateReviewSchema), updateReviewHandler)
  .delete(validateSchema(deleteReviewSchema), deleteReviewHandler);

export default router;
