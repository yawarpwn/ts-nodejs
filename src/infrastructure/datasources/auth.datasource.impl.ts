import { RegisterUserDto } from "../../domain";
import { AuthDataSources } from "../../domain/datasources/auth.datasources";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain";

export class AuthDataSourceImpl implements AuthDataSources {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    // Verificar si el correo existe
    // Hash de contraseña
    // Mapear respuesta a nuestra entidad

    try {
      return new UserEntity(1, "pepe", "pepe@pe.com", "1234", "admin");
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }
}
