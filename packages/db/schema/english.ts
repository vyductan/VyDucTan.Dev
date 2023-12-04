import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { users } from "./_nextauth";

// export const cefrLevelEnum = pgEnum("cefrLevel", ["C1", "known", "popular"]);
type CEFRLevel = "C1" | "known" | "popular";
type WordDefinition = {
  english: string;
  vietnamese: string;
  cefrLevel: CEFRLevel;
};
export const word = pgTable("word", {
  id: text("id").default(nanoid()).notNull().primaryKey(),
  name: text("name").notNull(),

  definitions: json("definitions").$type<WordDefinition[]>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
