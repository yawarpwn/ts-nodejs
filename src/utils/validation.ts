import z from "zod";

const loginSchema = z.object({
  username: z.string({ message: "username es requerido" }),
  password: z.string({ message: "password es requerido" }),
});

type LoginType = z.infer<typeof loginSchema>;

export class Validation {
  static login(obj: { [key: string]: any }): [string?, LoginType?] {
    const { error, data, success } = loginSchema.safeParse(obj);

    if (!success) {
      return [error.errors[0].message];
    }

    return [undefined, data];
  }
}
