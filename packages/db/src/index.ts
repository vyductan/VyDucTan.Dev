import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as auth from "./schema/auth";
import * as projects from "./schema/projects";
import * as tasks from "./schema/tasks";
import * as word from "./schema/word";

export const schema = { ...auth, ...projects, ...tasks, ...word };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";

export const db = drizzle(sql, { schema });

export type Database = typeof db;
