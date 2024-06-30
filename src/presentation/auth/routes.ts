import { Router, Request, Response } from "express";

export class AuthRoutes {
  static get routes() {
    const router = Router();

    router.post("/login", (req: Request, res: Response) => {
      res.json({ message: "login" });
    });
    router.post("/register", (req: Request, res: Response) => {
      res.json({ message: "register" });
    });

    return router;
  }
}
