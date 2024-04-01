import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";

export const validatePhoneExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body.phone) return next();

  const client = await prisma.client.findUnique({
    where: { phone: req.body.phone },
  });

  if (client) throw new AppError("Phone Already exists", 409);

  return next();
};
