import "dotenv/config";
import { compare } from "bcryptjs";
import { prisma } from "../app";
import AppError from "../errors/AppError.error";
import {
  TclientLoginRequest,
  TclientLoginResponse,
} from "../interfaces/client.interface";
import { sign } from "jsonwebtoken";

export const clientLoginService = async (
  data: TclientLoginRequest
): Promise<TclientLoginResponse> => {
  const { email } = data;
  const { password } = data;

  const client = await prisma.client.findUnique({
    where: {
      email: email,
    },
  });

  if (!client) throw new AppError("Invalid Credentials !", 401);

  const comparePasswords = await compare(password, client.password);

  if (!comparePasswords) throw new AppError("Invalid Credentials !", 401);

  const token = sign(
    { fullName: client.fullName, admin: client.admin },
    process.env.SECRET_KEY!,
    { subject: client.id, expiresIn: process.env.EXPIRES_IN }
  );

  const clientLoginResponse: TclientLoginResponse = {
    token: token,
    client: {
      id: client.id,
      fullName: client.fullName,
      email: client.email,
    },
  };

  return clientLoginResponse;
};
