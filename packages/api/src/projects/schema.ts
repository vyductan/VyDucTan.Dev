import { relations } from "drizzle-orm";
import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const projects = pgTable("project", {
  id: text("id").default(nanoid()).notNull().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  // userId: text("userId")
  //   .notNull()
  //   .references(() => users.id, { onDelete: "cascade" }),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasks = pgTable("task", {
  id: text("id").default(nanoid()).notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  content: json("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  // userId: text("userId")
  //   .notNull()
  //   .references(() => users.id, { onDelete: "cascade" }),

  projectId: text("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
}));
