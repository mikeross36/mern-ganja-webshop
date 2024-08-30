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
exports.createCategoryHandler = createCategoryHandler;
exports.getAllCategoriesHandler = getAllCategoriesHandler;
exports.getCategoryHandler = getCategoryHandler;
const categoryService_1 = require("../services/categoryService");
function createCategoryHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield (0, categoryService_1.createCategory)(req.body);
            if (!category) {
                return res
                    .status(400)
                    .json({ message: "Failed to create category. Invalid data passed" });
            }
            return res.status(201).json({ data: { category } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getAllCategoriesHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield (0, categoryService_1.findAllCategories)();
            if (!categories) {
                return res.status(404).json({ message: "Categories not found" });
            }
            return res
                .status(200)
                .json({ result: categories.length, data: { categories } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getCategoryHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.categoryId || typeof req.params.categoryId !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid category id" });
            }
            const category = yield (0, categoryService_1.findCategoryById)(req.params.categoryId);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(200).json(category);
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
