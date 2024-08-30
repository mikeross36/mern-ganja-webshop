"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const categoryController_1 = require("../controllers/categoryController");
const categorySchema_1 = require("../schemas/categorySchema");
const tokenProtect_1 = require("../middlewares/tokenProtect");
const requireUser_1 = require("../middlewares/requireUser");
const restrictTo_1 = require("../middlewares/restrictTo");
const router = express_1.default.Router();
router
    .route("/")
    .get(categoryController_1.getAllCategoriesHandler)
    .post([
    tokenProtect_1.tokenProtect,
    requireUser_1.requireUser,
    (0, restrictTo_1.restrictTo)("admin"),
    (0, validateSchema_1.default)(categorySchema_1.createCategorySchema),
    categoryController_1.createCategoryHandler,
]);
router
    .route("/:categoryId")
    .get((0, validateSchema_1.default)(categorySchema_1.getCategorySchema), categoryController_1.getCategoryHandler);
exports.default = router;
