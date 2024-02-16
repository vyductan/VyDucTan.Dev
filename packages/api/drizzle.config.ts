/**
 * Docs
 * https://orm.drizzle.team/kit-docs/conf
 */
import type { Config } from "drizzle-kit";

import { env } from "./src/env";

export default {
  schema: "./src/**/schema.ts",
  driver: "pg",
  dbCredentials: {
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    ssl: true,
  },
} satisfies Config;
