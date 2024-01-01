import { relations } from "drizzle-orm";
import { json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { users } from "./_nextauth";

export const projects = pgTable("project", {
  id: text("id").default(nanoid()).notNull().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  posts: many(tasks),
}));

export const tasks = pgTable("task", {
  id: text("id").default(nanoid()).notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  content: json("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  projectId: uuid("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
});

export const postsRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
}));

// // Schema for inserting a user - can be used to validate API requests
// const insertUserSchema = createInsertSchema(users);
//
// // Schema for selecting a user - can be used to validate API responses
// const selectUserSchema = createSelectSchema(users);
// // Overriding the fields
// const insertUserSchema = createInsertSchema(users, {
//   role: z.string(),
// });
// // Refining the fields - useful if you want to change the fields before they become nullable/optional in the final schema
// const insertUserSchema = createInsertSchema(users, {
//   id: (schema) => schema.id.positive(),
//   email: (schema) => schema.email.email(),
//   role: z.string(),
// });
// Usage
// const user = insertUserSchema.parse({
//   name: 'John Doe',
//   email: 'johndoe@test.com',
//   role: 'admin',
// });

// Zod schema type is also inferred from the table schema, so you have full type safety
// const requestSchema = insertUserSchema.pick({ name: true, email: true });
