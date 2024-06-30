import { Router, Request, Response } from "express";
import { AuthControllers } from "./controllers";

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const controller = new AuthControllers();

    router.post("/login", controller.registerUser);
    router.post("/register", controller.loginUser);

    return router;
  }
}
