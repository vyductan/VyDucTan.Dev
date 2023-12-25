import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import type { cefrLevelEnum, wordClassEnum } from "./schema";
import { wordDefinitions } from "./schema";

export type WordClass = (typeof wordClassEnum.enumValues)[number];
export type WordCEFRLevel = (typeof cefrLevelEnum.enumValues)[number];

export const insertWordDefinitionSchema = createInsertSchema(wordDefinitions);
export type AddWordDefinitionParams = z.infer<
  typeof insertWordDefinitionSchema
>;
