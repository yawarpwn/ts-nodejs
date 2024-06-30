import { Request, Response } from "express";
import { RegisterUserDto, AuthRepository } from "../../domain";
import { CustomError } from "../../domain";
export class AuthControllers {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) res.status(400).json({ error: error });

    this.authRepository
      .register(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json({ error: error.message }));
  };

  loginUser = (req: Request, res: Response) => {
    res.json({ message: "loginUser" });
  };
}
