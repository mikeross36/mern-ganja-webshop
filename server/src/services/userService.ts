import { FilterQuery, QueryOptions } from "mongoose";
import { UserModel } from "../models";
import { User } from "../models/userModel";
import { RegisterUserInput } from "../schemas/authSchema";
import { logger } from "../utils/logger";

export function createUser(input: RegisterUserInput) {
  try {
    return UserModel.create(input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error creating user: ${err.message}`);
      throw new Error("Failed to create user");
    }
    throw err;
  }
}

export function findUserById(id: string) {
  try {
    return UserModel.findById(id).select("+password");
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user by id: ${err.message}`);
      throw new Error("Failed to find user by id");
    }
    throw err;
  }
}

export function findUserByVerificationCode(hashedVerificationCode: string) {
  try {
    return UserModel.findOne({ verificationCode: hashedVerificationCode });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user by verification code: ${err.message}`);
      throw new Error("Failed to find user by verification code");
    }
    throw err;
  }
}

export function findAllUsers() {
  try {
    return UserModel.find();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding all users: ${err.message}`);
    }
    throw err;
  }
}

export function findUser(query: FilterQuery<User>, options: QueryOptions = {}) {
  try {
    return UserModel.findOne(query, {}, options).select("+password");
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user: ${err.message}`);
      throw new Error("Failed to find user");
    }
    throw err;
  }
}

export function findUserByResetToken(hashedResetToken: string) {
  try {
    return UserModel.findOne({ passwordResetToken: hashedResetToken });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user by reset token`);
      throw new Error("Failed to find user by reset token");
    }
    throw err;
  }
}

export function findUserAndUpdate(id: string, input: Partial<User>) {
  try {
    return UserModel.findByIdAndUpdate(id, input, { new: true });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user to update`);
      throw new Error("Failed to find user to udpate");
    }
    throw err;
  }
}

export function findUserAndDelete(id: string) {
  try {
    return UserModel.findByIdAndDelete(id);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user to delete`);
      throw new Error("Failed to find user to delete");
    }
    throw err;
  }
}
