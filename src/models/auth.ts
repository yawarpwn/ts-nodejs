export class RegisterUserDto {}
import { AuthDto } from "../controllers";

class AuthEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
  ) {}
}

export class AuthModel {
  static async login(authDto: AuthDto) {
    //1. verify if user exists
    //2. verify if password is correct
    //3. generate token
    //4. return user

    return new AuthEntity("1", "pepe", "pepe@pe.com", "1234");
  }
}
