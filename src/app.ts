import "reflect-metadata";
import "express-async-errors";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import express, { Application } from "express";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { allRoutes } from "./routers";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

export const prisma = new PrismaClient();

export const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use("/", allRoutes);

app.use(handleErrors);
