import { pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { words } from "../schema/english";

const cefrLevelEnum = pgEnum("cefrLevel", [
  "",
  "a1",
  "a2",
  "b1",
  "b2",
  "c1",
  "c2",
]);

const wordClassEnum = pgEnum("wordClass", ["", "noun", "verb", "adj", "adv"]);
export type WordClass = (typeof wordClassEnum.enumValues)[number];
export type WordCEFRLevel = (typeof cefrLevelEnum.enumValues)[number];

const wordClasses = z.array(
  z.object({
    name: z.enum(wordClassEnum.enumValues),
    definitions: z.array(
      z.object({
        cefrLevel: z.enum(cefrLevelEnum.enumValues),
        english: z.string(),
        vietnamese: z.string(),
        examples: z.string().array(),
      }),
    ),
  }),
);
export type WordClasses = z.infer<typeof wordClasses>;

/**
 * Zod
 */
export const insertWordSchema = createInsertSchema(words, {
  classes: wordClasses,
});

export type AddWordParams = z.infer<typeof insertWordSchema>;
