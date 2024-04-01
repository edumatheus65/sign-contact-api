import { Router } from "express";
import { clientLoginController } from "../controller/session.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { clientLoginRequestSchema } from "../schemas/client.schema";

export const sessionRouter: Router = Router();
sessionRouter.post(
  "/",
  validateBody(clientLoginRequestSchema),
  clientLoginController
);
