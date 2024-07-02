import { Response, Request } from "express";
import { AuthModel } from "../models";
import { HttpError } from "../errors/custom-error";
import { Validation } from "../utils";
import jsonWebToken from "jsonwebtoken";
import { envs } from "../config";

export class AuthController {
  static async login(req: Request, res: Response) {
    const [error, validUser] = Validation.login(req.body);

    if (error) res.status(400).json({ error: error });

    try {
      const user = await AuthModel.login(validUser!);

      //generate token
      const token = jsonWebToken.sign(
        { username: user.username },
        envs.JWT_SECRET_KEY,
        { expiresIn: "1h" },
      );

      //paste token in Response
      res
        .cookie("auth-token", token, {
          sameSite: "lax",
        })
        .json({ success: "user logged in", user: user.username });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).send({ error: error.message });
      }

      console.log(error);
      res.status(500).send({ error: "internal server error" });
    }
  }

  static async register(req: Request, res: Response) {
    const [error, userDto] = Validation.login(req.body);

    if (error) res.status(400).json({ error: error });

    try {
      const user = await AuthModel.register(userDto!);
      res.json({ success: "user created", user });
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message });
      }

      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  }
}
