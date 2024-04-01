import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";

export const validateEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body.email) return next();

  const client = await prisma.client.findUnique({
    where: { email: req.body.email },
  });

  if (client) throw new AppError("Email Already exists", 409);

  return next();
};
