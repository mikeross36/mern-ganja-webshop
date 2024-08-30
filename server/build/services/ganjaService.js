"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGanja = createGanja;
exports.findAllGanjas = findAllGanjas;
exports.findGanjaById = findGanjaById;
exports.findGanjaAndUpdate = findGanjaAndUpdate;
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
function createGanja(input) {
    try {
        return models_1.GanjaModel.create(input);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error creating ganja: ${err.message}`);
            throw new Error("Failed to create ganja");
        }
        throw err;
    }
}
function findAllGanjas() {
    try {
        return models_1.GanjaModel.find();
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding all ganjas: ${err.message}`);
            throw new Error("Failed to find all gnjas");
        }
        throw err;
    }
}
function findGanjaById(id) {
    try {
        return models_1.GanjaModel.findById(id).populate([
            {
                path: "reviews",
                strictPopulate: false,
            },
        ]);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding ganja by id: ${err.message}`);
            throw new Error("Failed to find ganja by id");
        }
        throw err;
    }
}
function findGanjaAndUpdate(id, input) {
    try {
        return models_1.GanjaModel.findByIdAndUpdate(id, input, { new: true });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding ganja to update: ${err.message}`);
            throw new Error("Faild to find ganja to update");
        }
        throw err;
    }
}
