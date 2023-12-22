import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import type { WordClasses } from "../types/english";

// const wordDefinitions = pgTable("definitions", {
//   class: wordClassEnum("class"),
//   cefrLevel: cefrLevelEnum("cefrLevel"),
//   english: text("english").notNull(),
//   vietnamese: text("vietnamese").notNull(),
//   // examples: json("examples").$type<string[]>().notNull(),
//   examples: text("examples").array().notNull(),
// });
// type WordDefinition = typeof wordDefinitions.$inferSelect;

export const words = pgTable("words", {
  // id: text("id").default(nanoid()).notNull().primaryKey(),
  name: text("name").notNull().primaryKey(),
  ipaUS: text("ipa_US"),
  ipaUK: text("ipa_UK"),
  classes: json("classes").$type<WordClasses>().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
// const x: typeof words.$inferSelect = {
//   definitions: []
// }
// type Word = typeof wordDefinitions.$inferSelect;
// type K = keyof Word;
// type X = FieldPath<(typeof words.$inferSelect)["definitions"][number]>;
//
// type GG = Word[K];

// export const wordsRelations = relations(words, ({ many }) => ({
//   definitions: many(definitions),
// }));
//
// export const definitions = pgTable("definitions", {
//   id: text("id").default(nanoid()).notNull().primaryKey(),
//   cefrLevel: cefrLevelEnum("cefrLevel").notNull(),
//   english: text("english").notNull(),
//   vietnamese: text("vietnamese").notNull(),
//   examples: json("examples").$type<string[]>().notNull(),
//   wordId: text("word_id").notNull(),
//
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });
//
// export const definitionsRelations = relations(definitions, ({ one }) => ({
//   word: one(words, {
//     fields: [definitions.wordId],
//     references: [words.id],
//   }),
// }));
