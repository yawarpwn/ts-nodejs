import "dotenv/config";
import { get } from "env-var";

export const envs = {
  TURSO_DATABASE_URL: get("TURSO_DATABASE_URL").required().asString(),
  TURSO_AUTH_TOKEN: get("TURSO_AUTH_TOKEN").required().asString(),
  JWT_SECRET_KEY: get("JWT_SECRET_KEY").required().asString(),
  PORT: get("PORT").default(3000).asPortNumber(),
};
