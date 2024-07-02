import { RegisterUserDto } from "../dtos/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSources {
  // abstract login() {}
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
