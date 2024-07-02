import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
