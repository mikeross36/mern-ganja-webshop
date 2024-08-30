"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findUserByVerificationCode = findUserByVerificationCode;
exports.findAllUsers = findAllUsers;
exports.findUser = findUser;
exports.findUserByResetToken = findUserByResetToken;
exports.findUserAndUpdate = findUserAndUpdate;
exports.findUserAndDelete = findUserAndDelete;
const models_1 = require("../models");
const logger_1 = require("../utils/logger");
function createUser(input) {
    try {
        return models_1.UserModel.create(input);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error creating user: ${err.message}`);
            throw new Error("Failed to create user");
        }
        throw err;
    }
}
function findUserById(id) {
    try {
        return models_1.UserModel.findById(id).select("+password");
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding user by id: ${err.message}`);
            throw new Error("Failed to find user by id");
        }
        throw err;
    }
}
function findUserByVerificationCode(hashedVerificationCode) {
    try {
        return models_1.UserModel.findOne({ verificationCode: hashedVerificationCode });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding user by verification code: ${err.message}`);
            throw new Error("Failed to find user by verification code");
        }
        throw err;
    }
}
function findAllUsers() {
    try {
        return models_1.UserModel.find();
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding all users: ${err.message}`);
        }
        throw err;
    }
}
function findUser(query, options = {}) {
    try {
        return models_1.UserModel.findOne(query, {}, options).select("+password");
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding user: ${err.message}`);
            throw new Error("Failed to find user");
        }
        throw err;
    }
}
function findUserByResetToken(hashedResetToken) {
    try {
        return models_1.UserModel.findOne({ passwordResetToken: hashedResetToken });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding user by reset token`);
            throw new Error("Failed to find user by reset token");
        }
        throw err;
    }
}
function findUserAndUpdate(id, input) {
    try {
        return models_1.UserModel.findByIdAndUpdate(id, input, { new: true });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding user to update`);
            throw new Error("Failed to find user to udpate");
        }
        throw err;
    }
}
function findUserAndDelete(id) {
    try {
        return models_1.UserModel.findByIdAndDelete(id);
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.logger.error(`Error finding user to delete`);
            throw new Error("Failed to find user to delete");
        }
        throw err;
    }
}
