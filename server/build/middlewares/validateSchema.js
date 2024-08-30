"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse({ body: req.body, params: req.params, query: req.query });
        next();
    }
    catch (err) {
        logger_1.logger.error(err.message);
        return res.status(400).send(err.errors);
    }
};
exports.default = validateSchema;
