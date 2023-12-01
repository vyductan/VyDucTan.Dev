import { json, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { users } from "./_nextauth";

type WordDefinition = {
  english: string;
  vietnamese: string;
};
export const cefrLevelEnum = pgEnum("cefrLevel", ["C1", "known", "popular"]);
export const word = pgTable("word", {
  id: text("id").default(nanoid()).notNull().primaryKey(),
  name: text("name").notNull(),

  level: cefrLevelEnum("level"),
  definitions: json("definitions").$type<WordDefinition[]>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
