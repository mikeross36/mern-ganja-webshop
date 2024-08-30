"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.findOrderById = findOrderById;
exports.findAllOrders = findAllOrders;
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
function createOrder(input) {
    try {
        return models_1.OrderModel.create(input);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error creating order: ${err.message}`);
            throw new Error("Failed to create order");
        }
        throw err;
    }
}
function findOrderById(id) {
    try {
        return models_1.OrderModel.findById(id);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding order by id: ${err.message}`);
            throw new Error("Failed to find order by id");
        }
        throw err;
    }
}
function findAllOrders() {
    try {
        return models_1.OrderModel.find();
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding user orders: ${err.message}`);
            throw new Error("Failed to find user orders");
        }
        throw err;
    }
}
