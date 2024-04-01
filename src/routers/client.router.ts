import { Router } from "express";
import {
  createClientController,
  deleteClientByIdController,
  readClientsByIdController,
  readClientsController,
  updateClientByIdController,
} from "../controller/client.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import {
  createClientRequestSchema,
  updateClientRequestSchema,
} from "../schemas/client.schema";
import { validateEmailExists } from "../middlewares/validateEmailExists.middleware";
import { validatePhoneExists } from "../middlewares/validatePhoneExists.middleware";
import {
  verifyAdmin,
  verifyPermission,
  verifyToken,
} from "../middlewares/security.middleware";
import { verifyClientIdExists } from "../middlewares/verifyClientIdExists.middleware";

export const clientRouter: Router = Router();

clientRouter.post(
  "/",
  validateBody(createClientRequestSchema),
  validateEmailExists,
  validatePhoneExists,
  createClientController
);
clientRouter.get("/", verifyToken, verifyAdmin, readClientsController);
clientRouter.get(
  "/:id",
  verifyClientIdExists,
  verifyToken,
  verifyPermission,
  readClientsByIdController
);
clientRouter.delete(
  "/:id",
  verifyToken,
  verifyClientIdExists,
  verifyPermission,
  deleteClientByIdController
);
clientRouter.patch(
  "/:id",
  validateBody(updateClientRequestSchema),
  verifyClientIdExists,
  verifyToken,
  verifyPermission,
  validateEmailExists,
  validatePhoneExists,
  updateClientByIdController
);
