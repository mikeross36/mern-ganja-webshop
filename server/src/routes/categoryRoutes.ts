import express from "express";
import validateSchema from "../middlewares/validateSchema";
import {
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryHandler,
} from "../controllers/categoryController";
import {
  createCategorySchema,
  getCategorySchema,
} from "../schemas/categorySchema";
import { tokenProtect } from "../middlewares/tokenProtect";
import { requireUser } from "../middlewares/requireUser";
import { restrictTo } from "../middlewares/restrictTo";

const router = express.Router();

router
  .route("/")
  .get(getAllCategoriesHandler)
  .post([
    tokenProtect,
    requireUser,
    restrictTo("admin"),
    validateSchema(createCategorySchema),
    createCategoryHandler,
  ]);

router
  .route("/:categoryId")
  .get(validateSchema(getCategorySchema), getCategoryHandler);

export default router;
