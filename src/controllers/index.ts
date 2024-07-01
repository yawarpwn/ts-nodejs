import { Response, Request } from "express";
import { AuthModel } from "../models";
import { CustomError } from "../domain";

export class AuthDto {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
  static create(obj: { [key: string]: any }): [string?, AuthDto?] {
    const { username, password } = obj;

    // TODO: Validations
    if (!username) return ["username is required"];
    if (!password) return ["Password is required"];

    return [undefined, new AuthDto(username, password)];
  }
}

export class AuthController {
  static async login(req: Request, res: Response) {
    const [error, userDto] = AuthDto.create(req.body);

    if (error) res.status(400).json({ error: error });

    try {
      const user = await AuthModel.login(userDto!);

      res
        .cookie("auth-token", user.token, {
          sameSite: "lax",
        })
        .json({ success: "user logged in", user: user.username });
    } catch (error) {
      if (error instanceof CustomError) {
        res.send({ error: error.message });
      }

      res.send({ error: "internal server error" });
    }
  }

  static async register(req: Request, res: Response) {
    const [error, userDto] = AuthDto.create(req.body);

    console.log({ userDto });
    if (error) res.status(400).json({ error: error });

    try {
      const user = await AuthModel.register(userDto!);
      res.json({ success: "user created" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.json({ error: error.message });
      }

      res.json({ error: "internal server error" });
    }
  }
}
