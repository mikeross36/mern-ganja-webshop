"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const reviewSchema_1 = require("../schemas/reviewSchema");
const reviewController_1 = require("../controllers/reviewController");
const tokenProtect_1 = require("../middlewares/tokenProtect");
const requireUser_1 = require("../middlewares/requireUser");
const router = express_1.default.Router({ mergeParams: true });
router
    .route("/")
    .get(reviewController_1.getAllReviewsHandler)
    .post(tokenProtect_1.tokenProtect, requireUser_1.requireUser, (0, validateSchema_1.default)(reviewSchema_1.createReviewSchema), reviewController_1.setGanjaAndUserIds, reviewController_1.createReviewHandler);
router.use(tokenProtect_1.tokenProtect, requireUser_1.requireUser);
router
    .route("/:reviewId")
    .get(reviewController_1.getReviewHandler)
    .patch((0, validateSchema_1.default)(reviewSchema_1.updateReviewSchema), reviewController_1.updateReviewHandler)
    .delete((0, validateSchema_1.default)(reviewSchema_1.deleteReviewSchema), reviewController_1.deleteReviewHandler);
exports.default = router;
