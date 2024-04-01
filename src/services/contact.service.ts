import { prisma } from "../app";
import AppError from "../errors/AppError.error";
import {
  TcontactResponse,
  TcreateContactRequest,
  TreadContactsResponse,
  TreadOneContactResponse,
  TupdateContactRequest,
} from "../interfaces/contact.interface";
import {
  contactResponseSchema,
  readContactResponseSchema,
  readContactsResponseSchema,
} from "../schemas/contact.schema";
import { Contact } from ".prisma/client";

export const createContactService = async (
  data: TcreateContactRequest,
  id: string
): Promise<TcontactResponse> => {
  const client = await prisma.client.findUnique({
    where: {
      id: id,
    },
  });

  if (!client) throw new AppError("Client Not Found!", 404);

  const emailArray = Array.isArray(data.email) ? data.email : [data.email];
  const phoneArray = Array.isArray(data.phone) ? data.phone : [data.phone];

  const newContact: TcontactResponse = await prisma.contact.create({
    data: {
      fullName: data.fullName,
      email: {
        set: emailArray,
      },
      phone: {
        set: phoneArray,
      },
      client: {
        connect: {
          id: id,
        },
      },
    },
  });

  return contactResponseSchema.parse(newContact);
};

export const readAllContactsService =
  async (): Promise<TreadContactsResponse> => {
    const contacts: TreadContactsResponse = await prisma.contact.findMany({
      include: { client: true },
    });
    return readContactsResponseSchema.parse(contacts);
  };

export const readOneContactByIdService = async (
  contact: Contact
): Promise<TreadOneContactResponse> => {
  const oneContact: Contact | null = await prisma.contact.findUnique({
    where: {
      id: contact.id,
    },
    include: {
      client: true,
    },
  });
  return readContactResponseSchema.parse(oneContact);
};

export const deleteOneContactByIdService = async (
  contact: Contact
): Promise<void> => {
  await prisma.contact.delete({ where: { id: contact.id } });
};

export const updateOneContactByIdService = async (
  contact: Contact,
  data: TupdateContactRequest
): Promise<TcontactResponse> => {
  const emailArray = data.email
    ? Array.isArray(data.email)
      ? data.email
      : [data.email]
    : undefined;

  const phoneArray = data.phone
    ? Array.isArray(data.phone)
      ? data.phone
      : [data.phone]
    : undefined;

  const updateData: any = {
    fullName: data.fullName,
  };
  if (emailArray !== undefined) {
    updateData.email = {
      set: emailArray,
    };
  }
  if (phoneArray !== undefined) {
    updateData.phone = {
      set: phoneArray,
    };
  }

  const updatedContact: Contact | null = await prisma.contact.update({
    where: {
      id: contact.id,
    },
    data: updateData,
  });

  return contactResponseSchema.parse(updatedContact);
};
