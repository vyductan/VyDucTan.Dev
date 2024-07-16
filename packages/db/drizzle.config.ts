import type { Config } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}
const DB_PREFIX = "vp_";

const nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");

export default {
  // schema: "./src/**/schema.ts",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  tablesFilter: [DB_PREFIX + "*"],
} satisfies Config;