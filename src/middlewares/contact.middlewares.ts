import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";

export const verifyContactIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) throw new AppError("Contact not found", 404);

  res.locals = { ...res.locals, contact };

  return next();
};
