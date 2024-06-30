import { Validators } from "../../config/validators";
export class RegisterUserDto {
  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["name is required"];
    if (!email) return ["email is required"];
    if (!Validators.email(email)) return ["email is invalid"];
    if (!password) return ["password is required"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
