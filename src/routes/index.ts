import { Router } from "express";
import { AuthRoutes } from "./auth";

export const appRoutes = Router();

appRoutes.use("/api/auth", AuthRoutes.routes);
