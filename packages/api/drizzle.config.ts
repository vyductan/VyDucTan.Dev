/**
 * Docs
 * https://orm.drizzle.team/kit-docs/conf
 */
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/**/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
