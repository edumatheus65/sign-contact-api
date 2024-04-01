import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError("Missing Bearer Token", 401);

  const getToken = authorization.split(" ")[1];

  const decodeToken = verify(getToken, process.env.SECRET_KEY!);

  res.locals = { ...res.locals, decodeToken };

  return next();
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { admin } = res.locals.decodeToken;

  if (!admin) throw new AppError("Insufficient Permissions", 403);

  return next();
};

export const verifyPermission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { admin, sub } = res.locals.decodeToken;

  const { id } = req.params;

  if (admin) return next();

  if (id !== sub) throw new AppError("Insufficient Permissions", 403);

  return next();
};

export const verifyContactPermission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { admin, sub } = res.locals.decodeToken;

  const contactClientId = res.locals.contact.client_id;

  if (admin) return next();

  if (contactClientId !== sub)
    throw new AppError("Insufficient Permissions", 403);

  return next();
};
