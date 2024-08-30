"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewSchema = exports.findReview = exports.updateReviewSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        content: (0, zod_1.string)({ required_error: "Review content is required" }).max(260, "Review content cannot be longer then 260 chars"),
    }),
});
exports.updateReviewSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        reviewId: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        content: (0, zod_1.string)({ required_error: "Review content is required" }).max(260, "Review content cannot be longer then 260 chars"),
    }),
});
exports.findReview = (0, zod_1.object)({
    params: (0, zod_1.object)({
        reviewId: (0, zod_1.string)(),
    }),
});
exports.deleteReviewSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        reviewId: (0, zod_1.string)(),
    }),
});
