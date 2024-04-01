import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";

export const verifyClientIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const client = await prisma.client.findUnique({
    where: { id },
  });

  if (!client) throw new AppError("Client not found", 404);

  res.locals = { ...res.locals, client };

  return next();
};
