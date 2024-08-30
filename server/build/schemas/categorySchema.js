"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategorySchema = exports.updateCategorySchema = exports.getCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Category name is required" }),
        origin: (0, zod_1.string)({ required_error: "Category origin is required" }),
        description: (0, zod_1.string)({ required_error: "Description is reqired" }).max(100, "Description must not be longer then 100 chars"),
        cbdToThcRatio: (0, zod_1.string)({ required_error: "Cbd Thc ratio is required" }),
        effectsOfUse: (0, zod_1.string)({ required_error: "Effects of use is required" }),
        periodOfUse: (0, zod_1.string)({ required_error: "Period of use is required" }),
        coverImage: (0, zod_1.string)({ required_error: "Cover image is required" }),
        ganjas: (0, zod_1.array)((0, zod_1.string)()),
    }),
};
const params = {
    params: (0, zod_1.object)({
        categoryId: (0, zod_1.string)({ required_error: "Category id is required" }),
    }),
};
exports.createCategorySchema = (0, zod_1.object)(Object.assign({}, payload));
exports.getCategorySchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateCategorySchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), payload));
exports.deleteCategorySchema = (0, zod_1.object)(Object.assign({}, params));
