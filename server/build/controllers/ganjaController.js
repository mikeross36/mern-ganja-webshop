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
exports.createGanjaHandler = createGanjaHandler;
exports.getAllGanjasHandler = getAllGanjasHandler;
exports.getGanjaHandler = getGanjaHandler;
const ganjaService_1 = require("../services/ganjaService");
function createGanjaHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ganja = yield (0, ganjaService_1.createGanja)(req.body);
            if (!ganja) {
                return res
                    .status(400)
                    .json({ message: "Bad request. Failed to create ganja" });
            }
            return res.status(201).json({ data: { ganja } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getAllGanjasHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ganjas = yield (0, ganjaService_1.findAllGanjas)();
            if (!ganjas) {
                return res.status(400).json({ message: "Unable to get all ganjas" });
            }
            return res.status(200).json({ result: ganjas.length, data: { ganjas } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
function getGanjaHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.ganjaId || typeof req.params.ganjaId !== "string") {
                return res
                    .status(400)
                    .json({ status: "error", message: "Invalid ganja id" });
            }
            const ganja = yield (0, ganjaService_1.findGanjaById)(req.params.ganjaId);
            if (!ganja) {
                return res.status(400).json({ message: "Unable to get ganja" });
            }
            return res.status(200).json({ data: { ganja } });
        }
        catch (err) {
            if (err instanceof Error) {
                return next(err);
            }
            return next(new Error("An unknown error occurred"));
        }
    });
}
