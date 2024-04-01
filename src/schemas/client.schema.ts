import { z } from "zod";

export const clientResponseSchema = z.object({
  id: z.string(),
  fullName: z.string().min(3).max(80),
  email: z.string().email().min(3).max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120).min(3),
  phone: z.string().max(18),
  createdAt: z.date(),
});

export const readOneClientResponseSchema = z.object({
  id: z.string(),
  fullName: z.string().min(3).max(80),
  email: z.string().email().min(3).max(45),
  admin: z.boolean().default(false),
  phone: z.string().max(18),
  createdAt: z.date(),
  contacts: z.array(
    z.object({
      id: z.string(),
      fullName: z.string().min(3).max(80),
      email: z.union([
        z.string().email().min(3).max(45),
        z.array(z.string().email().min(3).max(45)),
      ]),
      phone: z.union([z.string().max(18), z.array(z.string().max(18))]),
      createdAt: z.date(),
      client_id: z.string(),
    })
  ),
});

export const createClientRequestSchema = clientResponseSchema.pick({
  fullName: true,
  email: true,
  admin: true,
  password: true,
  phone: true,
});

export const clientWithoutAdminSchema = createClientRequestSchema.omit({
  admin: true,
});

export const updateClientRequestSchema = clientWithoutAdminSchema.partial();

export const clientResponseWithoutPasswordSchema = clientResponseSchema.omit({
  password: true,
});

export const clientsListResponseSchema =
  clientResponseWithoutPasswordSchema.array();

export const clientLoginRequestSchema = clientResponseSchema.pick({
  email: true,
  password: true,
});

export const clientLoginResponseSchema = z.object({
  token: z.string(),
  client: z.object({
    id: z.string(),
    fullName: z.string().min(3).max(80),
    email: z.string().email().min(3).max(45),
  }),
});
