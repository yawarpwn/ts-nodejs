import { Router } from "express";
import { AuthController } from "../controllers";

export const appRoutes = Router();

appRoutes.post("/api/auth", AuthController.login);
