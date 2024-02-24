import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const wordClassEnum = pgEnum("wordClass", [
  "",
  "noun",
  "verb",
  "adj",
  "adv",
  "phrase",
]);
export const cefrLevelEnum = pgEnum("cefrLevel", [
  "",
  "a1",
  "a2",
  "b1",
  "b2",
  "c1",
  "c2",
]);
export const masteryEnum = pgEnum("mastery", ["1", "2", "3", "4", "5"]);

export const wordDefinitions = pgTable("wordDefinitions", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .default("")
    .notNull()
    .primaryKey(),
  word: text("word").notNull(),
  class: wordClassEnum("class"),
  ipaUk: text("ipa_uk"),
  ipaUs: text("ipa_us"),
  cefrLevel: cefrLevelEnum("cefrLevel"),
  english: text("english").notNull(),
  vietnamese: text("vietnamese").notNull(),
  relatedWords: text("related_words"),
  examples: text("examples").array().notNull(),
  mastery: masteryEnum("mastery"),
  lastLearnedAt: timestamp("last_learned_at").defaultNow(),
});
