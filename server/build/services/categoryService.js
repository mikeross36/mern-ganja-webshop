"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = createCategory;
exports.findAllCategories = findAllCategories;
exports.findCategoryById = findCategoryById;
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
function createCategory(input) {
    try {
        return models_1.CategoryModel.create(input);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error creating category: ${err.message}`);
            throw new Error("Failed to create category");
        }
        throw err;
    }
}
function findAllCategories() {
    try {
        return models_1.CategoryModel.find();
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding all categories: ${err.message}`);
            throw new Error("Failed to find all categories");
        }
        throw err;
    }
}
function findCategoryById(id) {
    try {
        return models_1.CategoryModel.findById(id);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding category by id`);
            throw new Error("Failed to find category by id");
        }
        throw err;
    }
}
