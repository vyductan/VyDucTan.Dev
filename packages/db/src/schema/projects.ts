import { relations } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { pgTable } from "./_table";
import { tasks } from "./tasks";

export const projects = pgTable("project", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .default("")
    .notNull()
    .primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  tasks: many(tasks, { relationName: "project" }),
}));
