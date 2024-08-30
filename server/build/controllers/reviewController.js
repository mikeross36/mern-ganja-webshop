"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGanjaAndUserIds = setGanjaAndUserIds;
exports.createReviewHandler = createReviewHandler;
exports.getAllReviewsHandler = getAllReviewsHandler;
exports.getReviewHandler = getReviewHandler;
exports.updateReviewHandler = updateReviewHandler;
exports.deleteReviewHandler = deleteReviewHandler;
const reviewService_1 = require("../services/reviewService");
// function provides ganja & user Schema.ObjectId
function setGanjaAndUserIds(req, res, next) {
    if (!req.body.ganja)
        req.body.ganja = req.params.ganjaId;
    if (!req.body.user)
        req.body.user = req.user._id;
    next();
}
function createReviewHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const review = yield (0, reviewService_1.createReview)(req.body);
            if (!review) {
                return res
                    .status(400)
                    .json({ message: "Failed to create review. Invalid data passed" });
            }
            return res
                .status(200)
                .json({ status: "success", message: "Review added", data: { review } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getAllReviewsHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reviews = yield (0, reviewService_1.getAllReviews)();
            if (!reviews) {
                return res.status(404).json({ message: "Reviews not found!" });
            }
            return res.status(200).json({ result: reviews.length, data: { reviews } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getReviewHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id || typeof req.params.id !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid review id" });
            }
            const review = yield (0, reviewService_1.findReviewById)(req.params.id);
            if (!review) {
                return res.status(404).json(review);
            }
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function updateReviewHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedReview = yield (0, reviewService_1.findAndUpdateReview)(req.params.reviewId, req.body);
            if (!updatedReview) {
                return res.status(400).json({ message: "Failed to update review" });
            }
            return res.status(201).json({ status: "success", updatedReview });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function deleteReviewHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.reviewId || typeof req.params.reviewId !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "review order id" });
            }
            const reviewToDel = yield (0, reviewService_1.findAndDeleteReview)(req.params.reviewId);
            if (!reviewToDel) {
                return res.status(400).json({ message: "Failed to delete review" });
            }
            return res
                .status(204)
                .json({ status: "success", message: "Review deleted", data: null });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
