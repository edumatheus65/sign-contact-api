import { hash } from "bcryptjs";
import {
  TclientResponseWithoutPassword,
  TcreateClientRequest,
  TreadClientsList,
  TupdateClientRequest,
} from "../interfaces/client.interface";
import { prisma } from "../app";
import {
  clientResponseWithoutPasswordSchema,
  clientsListResponseSchema,
  readOneClientResponseSchema,
} from "../schemas/client.schema";
import { Client } from ".prisma/client";

export const createClientService = async (
  data: TcreateClientRequest
): Promise<TclientResponseWithoutPassword> => {
  data.password = await hash(data.password, 12);
  const newClient: TclientResponseWithoutPassword = await prisma.client.create({
    data,
  });
  return clientResponseWithoutPasswordSchema.parse(newClient);
};

export const readClientsService = async (): Promise<TreadClientsList> => {
  const clients: TreadClientsList = await prisma.client.findMany();
  return clientsListResponseSchema.parse(clients);
};

export const readClientsByIdService = async (
  client: Client
): Promise<TclientResponseWithoutPassword> => {
  const oneClient = await prisma.client.findUnique({
    where: {
      id: client.id,
    },
    include: {
      contacts: true,
    },
  });

  return readOneClientResponseSchema.parse(oneClient);
};

export const deleteClientByIdService = async (
  client: Client
): Promise<void> => {
  await prisma.client.delete({ where: { id: client.id } });
};

export const updateClientByIdService = async (
  client: Client,
  data: TupdateClientRequest
): Promise<TclientResponseWithoutPassword> => {
  const updatedClient = await prisma.client.update({
    where: {
      id: client.id,
    },
    data,
  });
  return clientResponseWithoutPasswordSchema.parse(updatedClient);
};
