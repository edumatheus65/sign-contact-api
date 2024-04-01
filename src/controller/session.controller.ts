import { Request, Response } from "express";
import { TclientLoginResponse } from "../interfaces/client.interface";
import { clientLoginService } from "../services/session.service";

export const clientLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: TclientLoginResponse = await clientLoginService(req.body);
  return res.status(200).json(token);
};
