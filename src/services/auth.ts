import crypto from "node:crypto";

import { client } from "../config/db";
import type { UserRegister } from "../types";

export class AuthUserService {
  static async findUser(username: string) {
    console.log("username", username);
    const user = await client.execute({
      sql: `SELECT username, password  FROM users  WHERE username = ?`,
      args: [username],
    });

    if (user.rows.length === 0) {
      return null;
    }

    return {
      username: user.rows[0].username as string,
      password: user.rows[0].password as string,
    };
  }

  static async insertUser(user: UserRegister) {
    // const { username, password, id } = user;
    // await client.execute({
    //   sql: "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
    //   args: [id, username, hashedPassword],
    // });
  }
}
