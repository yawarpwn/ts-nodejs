import { createClient } from "@libsql/client";
import { envs } from "./envs";

export const client = createClient({
  url: envs.TURSO_DATABASE_URL,
  authToken: envs.TURSO_AUTH_TOKEN,
});
