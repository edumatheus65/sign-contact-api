import { z } from "zod";
import {
  clientWithoutAdminSchema,
  createClientRequestSchema,
  clientResponseWithoutPasswordSchema,
  clientsListResponseSchema,
  clientLoginRequestSchema,
  clientLoginResponseSchema,
} from "../schemas/client.schema";

export type TcreateClientRequest = z.infer<typeof createClientRequestSchema>;
export type TclientWithoutAdmin = z.infer<typeof clientWithoutAdminSchema>;
export type TupdateClientRequest = Partial<TclientWithoutAdmin>;
export type TclientResponseWithoutPassword = z.infer<
  typeof clientResponseWithoutPasswordSchema
>;
export type TreadClientsList = z.infer<typeof clientsListResponseSchema>;
export type TclientLoginRequest = z.infer<typeof clientLoginRequestSchema>;
export type TclientLoginResponse = z.infer<typeof clientLoginResponseSchema>;
