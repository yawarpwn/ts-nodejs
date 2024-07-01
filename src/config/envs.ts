import "dotenv/config";
import { get } from "env-var";

export const envs = {
  TURSO_DATABASE_URL: get("TURSO_DATABASE_URL").required().asString(),
  TURSO_AUTH_TOKEN: get("TURSO_AUTH_TOKEN").required().asString(),
};
