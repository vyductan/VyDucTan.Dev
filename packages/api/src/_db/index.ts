// https://github.com/vercel/examples/blob/a2c4e7bedf4a336e4cfd51d6d79724820ee246a7/storage/postgres-drizzle/lib/drizzle.ts
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as auth from "../auth/schema";
import * as english from "../english/schema";
import * as projects from "../projects/schema";
import * as tasks from "../tasks/schema";

export const schema = { ...auth, ...english, ...projects, ...tasks };

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";

// connect to vercel postgres
export const db = drizzle(sql, { schema });

export type Database = typeof db;
