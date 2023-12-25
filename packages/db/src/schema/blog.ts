import { relations } from "drizzle-orm";
import { json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { users } from "./_nextauth";

export const blogs = pgTable("project", {
  id: text("id").default(nanoid()).notNull().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// export const projectsRelations = relations(projects, ({ many }) => ({
//   posts: many(tasks),
// }));
//
// export const tasks = pgTable("task", {
//   id: text("id").default(nanoid()).notNull().primaryKey(),
//   name: text("name").notNull(),
//   description: text("description"),
//   content: json("content"),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   completedAt: timestamp("completed_at"),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
//
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//
//   projectId: uuid("project_id").references(() => projects.id, {
//     onDelete: "cascade",
//   }),
// });
//
// export const postsRelations = relations(tasks, ({ one }) => ({
//   project: one(projects, {
//     fields: [tasks.projectId],
//     references: [projects.id],
//   }),
// }));
