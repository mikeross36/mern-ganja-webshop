import { GanjaModel } from "../models";
import { logger } from "../utils/logger";
import { CreateGanjaInput } from "../schemas/ganjaSchema";

export function createGanja(input: CreateGanjaInput) {
  try {
    return GanjaModel.create(input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error creating ganja: ${err.message}`);
      throw new Error("Failed to create ganja");
    }
    throw err;
  }
}

export function findAllGanjas() {
  try {
    return GanjaModel.find();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding all ganjas: ${err.message}`);
      throw new Error("Failed to find all gnjas");
    }
    throw err;
  }
}

export function findGanjaById(id: string) {
  try {
    return GanjaModel.findById(id).populate([
      {
        path: "reviews",
        strictPopulate: false,
      },
    ]);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding ganja by id: ${err.message}`);
      throw new Error("Failed to find ganja by id");
    }
    throw err;
  }
}

export function findGanjaAndUpdate(id: string, input: CreateGanjaInput) {
  try {
    return GanjaModel.findByIdAndUpdate(id, input, { new: true });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding ganja to update: ${err.message}`);
      throw new Error("Faild to find ganja to update");
    }
    throw err;
  }
}
