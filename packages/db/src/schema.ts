import type { AdapterAccountType } from "next-auth/adapters";
import { relations, sql } from "drizzle-orm";
import {
  integer,
  json,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const DB_PREFIX = "vp_";
const pgTable = pgTableCreator((name) => `${DB_PREFIX}${name}`);

/*
 * Project
 */
export const Project = pgTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => sql`now()`),
});

export const ProjectRelations = relations(Project, ({ many }) => ({
  tasks: many(Task, { relationName: "project" }),
}));

export const CreateProjectSchema = createInsertSchema(Project).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/*
 * Task
 */
export const TaskStatusEnum = pgEnum("todo_status", [
  "todo",
  "not_started",
  "in_progress",
  "in_review",
  "done",
  "archived",
]);

export const TaskTypeEnum = pgEnum("task_type", [
  "",
  "bug",
  "feat",
  "docs",
  "module",
  "refactor",
]);

export const Task = pgTable("task", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  status: TaskStatusEnum("status").default("todo"),
  estimatedStart: timestamp("estimated_start"),
  estimatedEnd: timestamp("estimated_end"),
  description: text("description"),
  content: json("content").$type<string>(),
  completedAt: timestamp("completed_at"),
  type: TaskTypeEnum("type").default(""),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => sql`now()`),

  parentId: text("parent_id"),
  projectId: text("project_id")
    .references(() => Project.id, {
      onDelete: "cascade",
    })
    .default("")
    .notNull(),
});

export const CreateTaskSchema = createInsertSchema(Task, {
  content: z.string(),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .omit({
    estimatedStart: true,
    estimatedEnd: true,
  })
  .merge(
    z.object({
      estimatedDuration: z
        .object({
          start: z.date(),
          end: z.date(),
        })
        .optional(),
    }),
  );

export const TaskRelations = relations(Task, ({ one, many }) => ({
  project: one(Project, {
    fields: [Task.projectId],
    references: [Project.id],
    relationName: "project",
  }),
  parrent: one(Task, {
    fields: [Task.parentId],
    references: [Task.id],
    relationName: "parent",
  }),
  children: many(Task, { relationName: "parent" }),
}));

/*
 * Word
 */
export const WordClassEnum = pgEnum("wordClass", [
  "",
  "noun",
  "verb",
  "adj",
  "adv",
  "phrase",
]);

export const CefrLevelEnum = pgEnum("cefrLevel", [
  "",
  "a1",
  "a2",
  "b1",
  "b2",
  "c1",
  "c2",
]);
export const WordMasteryEnum = pgEnum("mastery", ["1", "2", "3", "4", "5"]);

export const Word = pgTable("word", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  word: text("word").notNull(),
  cambridgeUrl: text("cambridge_url"),
  cefrLevel: CefrLevelEnum("cefr_level"),
  pos: WordClassEnum("pos"),
  gram: text("gram"),
  ipaUk: text("ipa_uk"),
  ipaUs: text("ipa_us"),
  definition: text("definition"),
  translation: text("translation"),
  relatedWords: text("related_words"),
  examples: text("examples").array(),
  mastery: WordMasteryEnum("mastery"),
  lastLearnedAt: timestamp("last_learned_at").defaultNow(),
});

export const AddWordSchema = createInsertSchema(Word, {
  examples: z.array(z.string()),
}).omit({
  id: true,
});

/*
 * Next Auth
 */
export const User = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const UserRelations = relations(User, ({ many }) => ({
  accounts: many(Account),
}));

export const Account = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] }),
}));

export const Session = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));
