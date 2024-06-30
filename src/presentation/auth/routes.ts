import { Router, Request, Response } from "express";
import { AuthControllers } from "./controllers";
import { AuthRepositoryImpl, AuthDataSourceImpl } from "../../infrastructure";

export class AuthRoutes {
  static get routes() {
    const router = Router();

    const database = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(database);

    const controller = new AuthControllers(authRepository);

    router.post("/login", controller.registerUser);
    router.post("/register", controller.loginUser);

    return router;
  }
}
