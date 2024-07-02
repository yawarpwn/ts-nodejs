import { Router } from "express";
import { AuthController } from "../controllers";

export class AuthRoutes {
  static get routes() {
    const router = Router();
    router.post("/login", AuthController.login);
    router.post("/register", AuthController.register);
    return router;
  }
}
