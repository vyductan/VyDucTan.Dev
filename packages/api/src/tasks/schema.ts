import { relations } from "drizzle-orm";
import { json, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { projects } from "../projects/schema";

export const todoStatusEnum = pgEnum("todo_status", [
  "",
  "not_started",
  "in_progress",
  "in_review",
  "done",
  "archived",
]);

export const tasks = pgTable("task", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .default("")
    .notNull()
    .primaryKey(),
  name: text("name").notNull(),
  status: todoStatusEnum("status").default("").notNull(),
  estimatedStart: timestamp("estimated_start"),
  estimatedEnd: timestamp("estimated_start"),
  description: text("description"),
  content: json("content"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  parentId: text("parent_id"),
  projectId: text("project_id")
    .references(() => projects.id, {
      onDelete: "cascade",
    })
    .default("")
    .notNull(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  parrent: one(tasks, {
    fields: [tasks.parentId],
    references: [tasks.id],
  }),
  children: many(tasks),
}));
