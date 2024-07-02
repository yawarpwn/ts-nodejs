import bcrypt from "bcrypt";
import { AuthUserService } from "../services";
import { UserLogin } from "../types";

import { HttpError } from "../errors";

export class AuthModel {
  static async login(validUser: {
    username: string;
    password: string;
  }): Promise<UserLogin> {
    const { username, password } = validUser;

    //verify if exist username
    const user = await AuthUserService.findUser(username);
    if (!user) throw HttpError.badRequest("User not found");

    //verify if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw HttpError.badRequest("Wrong password");

    return user;
  }

  static async register(registerUserDto: UserLogin) {
    const { username, password } = registerUserDto;

    //1. Verify if user not exists
    const user = await AuthUserService.findUser(username);

    if (!user) throw HttpError.badRequest("Username already exists");

    try {
      //2. hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //3. insert user in db
      const id = crypto.randomUUID();

      return { id, username, hashedPassword };
    } catch (error) {
      console.log(error);
      throw HttpError.internalServerError("error inserting in db");
    }

    //4. generate token
    //5. return user
  }
}
