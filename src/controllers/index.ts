import crypto from "node:crypto";
import { Response, Request } from "express";
import { AuthModel } from "../models";
import { CustomError } from "../domain";

export class AuthDto {
  constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
  ) {}
  static create(obj: { [key: string]: any }) {
    const { name, email, password } = obj;

    // TODO: Validations
    if (!name) ["Name is required"];
    if (!email) ["Email is required"];
    if (!password) ["Password is required"];

    return [undefined, new AuthDto(name, email, password)];
  }
}

export class AuthController {
  static async login(req: Request, res: Response) {
    const [error, userDto] = AuthDto.create(req.body);

    if (error) res.status(400).json({ error: error });

    try {
      const user = await AuthModel.login(userDto!);
      res.json({ user });
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError();
    }
  }
}
