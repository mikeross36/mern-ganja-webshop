import { Request, Response, NextFunction } from "express";
import {
  createGanja,
  findAllGanjas,
  findGanjaById,
} from "../services/ganjaService";

export async function createGanjaHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ganja = await createGanja(req.body);
    if (!ganja) {
      return res
        .status(400)
        .json({ message: "Bad request. Failed to create ganja" });
    }
    return res.status(201).json({ data: { ganja } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getAllGanjasHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ganjas = await findAllGanjas();
    if (!ganjas) {
      return res.status(400).json({ message: "Unable to get all ganjas" });
    }
    return res.status(200).json({ result: ganjas.length, data: { ganjas } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}

export async function getGanjaHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.ganjaId || typeof req.params.ganjaId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid ganja id" });
    }
    const ganja = await findGanjaById(req.params.ganjaId);
    if (!ganja) {
      return res.status(400).json({ message: "Unable to get ganja" });
    }
    return res.status(200).json({ data: { ganja } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}
