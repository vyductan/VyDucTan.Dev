import { relations } from "drizzle-orm";
import { json, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { projects } from "./projects";

export const todoStatusEnum = pgEnum("todo_status", [
  "todo",
  "not_started",
  "in_progress",
  "in_review",
  "done",
  "archived",
]);

export const taskTypeEnum = pgEnum("task_type", [
  "",
  "bug",
  "feat",
  "docs",
  "module",
]);

export const tasks = pgTable("task", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .default("")
    .notNull()
    .primaryKey(),
  name: text("name").notNull(),
  status: todoStatusEnum("status").default("todo").notNull(),
  estimatedStart: timestamp("estimated_start"),
  estimatedEnd: timestamp("estimated_end"),
  description: text("description"),
  content: json("content").$type<string>(),
  completedAt: timestamp("completed_at"),
  type: taskTypeEnum("type").default("").notNull(),

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
    relationName: "project",
  }),
  parrent: one(tasks, {
    fields: [tasks.parentId],
    references: [tasks.id],
    relationName: "parent",
  }),
  children: many(tasks, { relationName: "parent" }),
}));
