// https://github.com/vercel/examples/blob/a2c4e7bedf4a336e4cfd51d6d79724820ee246a7/storage/postgres-drizzle/lib/drizzle.ts
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as auth from "./auth/schema";
import * as english from "./english/schema";

export * from "./english/types";

export const schema = { ...auth, ...english };

export * from "drizzle-orm";

// Connect to Vercel Postgres
export const db = drizzle(sql, { schema });
