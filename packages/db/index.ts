// https://github.com/vercel/examples/blob/a2c4e7bedf4a336e4cfd51d6d79724820ee246a7/storage/postgres-drizzle/lib/drizzle.ts
import { createPool } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

// Connect to Vercel Postgres
export const db = drizzle(
  createPool({
    connectionString: process.env.DATABASE_URL,
  }),
);
