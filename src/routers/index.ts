import { Router } from "express";
import { clientRouter } from "./client.router";
import { sessionRouter } from "./session.router";
import { contactRouter } from "./contact.router";

export const allRoutes: Router = Router();

allRoutes.use("/clients", clientRouter);
allRoutes.use("/login", sessionRouter);
allRoutes.use("/contacts", contactRouter);
