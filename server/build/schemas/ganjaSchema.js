"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGanjaSchema = exports.updateGanjaSchema = exports.getGanjaSchema = exports.createGanjaSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Ganja's name is reqired" }),
        category: (0, zod_1.string)({ required_error: "Category is required" }),
        thca: (0, zod_1.string)({ required_error: "Thca is required" }),
        thc: (0, zod_1.string)({ required_error: "Thc is required" }),
        cbda: (0, zod_1.string)({ required_error: "Cbda is required" }),
        cbd: (0, zod_1.string)({ required_error: "Cbd is required" }),
        summary: (0, zod_1.string)({ required_error: "Summary is reqiured" }).max(200, "Summary cannot be longer then 200 chars"),
        price: (0, zod_1.number)({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
        }).positive({ message: "Price must be greater then 0" }),
        coverImage: (0, zod_1.string)({ required_error: "Cover image is required" }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        ganjaId: (0, zod_1.string)({ required_error: "Ganja's id is required" }),
    }),
};
exports.createGanjaSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.getGanjaSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateGanjaSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params), payload));
exports.deleteGanjaSchema = (0, zod_1.object)(Object.assign({}, params));
