import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { schema } from "@acme/db";

export type WordClass = (typeof schema.wordClassEnum.enumValues)[number];
export type WordCEFRLevel = (typeof schema.cefrLevelEnum.enumValues)[number];
export type WordMastery = (typeof schema.masteryEnum.enumValues)[number];

export const insertWordSchema = createInsertSchema(schema.words, {
  examples: z.array(z.string()),
});
