import { pgEnum, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { pgTable } from "./_table";

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

export const words = pgTable("word", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .notNull()
    .primaryKey(),
  word: text("word").notNull(),
  cambridgeUrl: text("cambridge_url"),
  cefrLevel: cefrLevelEnum("cefr_level"),
  pos: wordClassEnum("pos"),
  gram: text("gram"),
  ipaUk: text("ipa_uk"),
  ipaUs: text("ipa_us"),
  definition: text("definition"),
  translation: text("translation"),
  relatedWords: text("related_words"),
  examples: text("examples").array(),
  mastery: masteryEnum("mastery"),
  lastLearnedAt: timestamp("last_learned_at").defaultNow(),
});
