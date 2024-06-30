import { AuthDataSources, RegisterUserDto, UserEntity } from "../../domain";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(public readonly authDataSource: AuthDataSources) {}
  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDto);
  }
}
