import { pgTableCreator } from "drizzle-orm/pg-core";

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";

export const DB_PREFIX = "vp_";
export const pgTable = pgTableCreator((name) => `${DB_PREFIX}${name}`);

export * from "./client";
