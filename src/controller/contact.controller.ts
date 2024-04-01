import { Request, Response } from "express";
import {
  createContactService,
  deleteOneContactByIdService,
  readAllContactsService,
  readOneContactByIdService,
  updateOneContactByIdService,
} from "../services/contact.service";
import {
  TcontactResponse,
  TreadContactsResponse,
  TreadOneContactResponse,
} from "../interfaces/contact.interface";

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { sub } = res.locals.decodeToken;
  const newContact = await createContactService(req.body, sub);
  return res.status(201).json(newContact);
};

export const readAllContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contacts: TreadContactsResponse = await readAllContactsService();
  return res.status(201).json(contacts);
};

export const readOneContactByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contact } = res.locals;
  const oneContact: TreadOneContactResponse = await readOneContactByIdService(
    contact
  );
  return res.status(200).json(oneContact);
};

export const deleteOneContactByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contact } = res.locals;
  await deleteOneContactByIdService(contact);
  return res.status(204).json();
};

export const updateOneContactByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contact } = res.locals;
  const updatedContact: TcontactResponse = await updateOneContactByIdService(
    contact,
    req.body
  );
  return res.status(200).json(updatedContact);
};
