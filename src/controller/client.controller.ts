import { Request, Response } from "express";
import {
  createClientService,
  deleteClientByIdService,
  readClientsByIdService,
  readClientsService,
  updateClientByIdService,
} from "../services/client.service";

export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newClient = await createClientService(req.body);
  return res.status(201).json(newClient);
};

export const readClientsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clients = await readClientsService();
  return res.status(200).json(clients);
};

export const readClientsByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { client } = res.locals;
  const oneClient = await readClientsByIdService(client);
  return res.status(200).json(oneClient);
};

export const deleteClientByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { client } = res.locals;
  await deleteClientByIdService(client);
  return res.status(204).json();
};

export const updateClientByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { client } = res.locals;
  const updatedClient = await updateClientByIdService(client, req.body);
  return res.status(200).json(updatedClient);
};
