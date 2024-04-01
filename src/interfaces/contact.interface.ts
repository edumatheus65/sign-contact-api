import { z } from "zod";
import {
  contactResponseSchema,
  createContactRequestSchema,
  readContactResponseSchema,
  readContactsResponseSchema,
} from "../schemas/contact.schema";

export type TcontactResponse = z.infer<typeof contactResponseSchema>;
export type TcreateContactRequest = z.infer<typeof createContactRequestSchema>;
export type TupdateContactRequest = Partial<
  Omit<TcreateContactRequest, "email" | "phone">
> & {
  fullName: string | null;
  email: string[];
  phone: string[];
};
export type TreadContactsResponse = z.infer<typeof readContactsResponseSchema>;
export type TreadOneContactResponse = z.infer<typeof readContactResponseSchema>;
