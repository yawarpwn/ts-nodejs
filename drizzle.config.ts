import { defineConfig } from "drizzle-kit";
import { envs } from "./src/config";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: envs.TURSO_DATABASE_URL,
    authToken: envs.TURSO_AUTH_TOKEN,
  },
});
