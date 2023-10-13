// Docs: https://orm.drizzle.team/kit-docs/conf
import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

// dotenv.config();
dotenv.config({
  path: "../../.env",
});

// console.log("e", dotenv.config(), process.env);
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
export default {
  schema: "./schema/*",
  driver: "pg",
  // out: "./src/@server/db/drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
