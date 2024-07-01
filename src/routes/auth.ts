import { Router } from "express";
import { AuthController } from "../controllers";

export const authRoutes = Router();

authRoutes.post("/api/auth/login", AuthController.login);
authRoutes.post("/api/auth/register", AuthController.register);
