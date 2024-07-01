import { createClient } from "@libsql/client";
import bcrypt from "bcrypt";
import { envs } from "../config/envs";

export const turso = createClient({
  url: envs.TURSO_DATABASE_URL,
  authToken: envs.TURSO_AUTH_TOKEN,
});

import { AuthDto } from "../controllers";
import { CustomError } from "../domain";

class AuthEntity {
  constructor(
    private readonly id: string,
    private readonly username: string,
    private readonly password: string,
  ) {}
}

export class AuthModel {
  static async login(authDto: AuthDto) {
    const { username, password } = authDto;

    //verify if exist username
    const user = await turso.execute({
      sql: "SELECT * FROM users WHERE username = ?",
      args: [username],
    });

    if (user.rows.length === 0) throw CustomError.badRequest("User not found");
    const { password: hashedPassword } = user.rows[0];

    //verify if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedPassword as string,
    );

    if (!isPasswordCorrect) throw CustomError.badRequest("Wrong password");

    return user.rows[0];
  }

  static async register(registerUserDto: AuthDto) {
    const { username, password } = registerUserDto;

    //1. Verify if user not exists
    const user = await turso.execute({
      sql: "SELECT * FROM users WHERE username = ?",
      args: [username],
    });

    if (user.rows.length > 0)
      throw CustomError.badRequest("Username already exists");

    try {
      //2. hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //3. insert user in db
      const id = crypto.randomUUID();
      await turso.execute({
        sql: "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
        args: [id, username, hashedPassword],
      });

      return new AuthEntity(id, username, hashedPassword);
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError("error inserting in db");
    }

    //4. generate token
    //5. return user
  }
}
