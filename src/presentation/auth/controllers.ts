import { Request, Response } from "express";
export class AuthControllers {
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.send(req.body);
  };

  loginUser = (req: Request, res: Response) => {
    res.json({ message: "loginUser" });
  };
}
