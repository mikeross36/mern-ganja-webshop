"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = createReview;
exports.getAllReviews = getAllReviews;
exports.findReviewById = findReviewById;
exports.findAndUpdateReview = findAndUpdateReview;
exports.findAndDeleteReview = findAndDeleteReview;
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
function createReview(input) {
    try {
        return models_1.ReviewModel.create(input);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error creating review: ${err.message}`);
            throw new Error("Failed to create review");
        }
        throw err;
    }
}
function getAllReviews() {
    try {
        return models_1.ReviewModel.find();
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error getting all reviews: ${err.message}`);
        }
        throw err;
    }
}
function findReviewById(id) {
    try {
        return models_1.ReviewModel.findById(id);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding review by id: ${err.message}`);
        }
        throw err;
    }
}
function findAndUpdateReview(id, input) {
    try {
        return models_1.ReviewModel.findByIdAndUpdate(id, input);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding and updating review: ${err.message}`);
            throw new Error("Failed to find and update review");
        }
        throw err;
    }
}
function findAndDeleteReview(id) {
    try {
        return models_1.ReviewModel.findByIdAndDelete(id);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding and deleting review: ${err.message}`);
            throw new Error("Failed to find and delete review");
        }
        throw err;
    }
}
