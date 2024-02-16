import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import type { RouterOutputs } from "../root";
import type { cefrLevelEnum, masteryEnum, wordClassEnum } from "./schema";
import { wordDefinitions } from "./schema";

export type WordClass = (typeof wordClassEnum.enumValues)[number];
export type WordCEFRLevel = (typeof cefrLevelEnum.enumValues)[number];
export type WordMastery = (typeof masteryEnum.enumValues)[number];

export const insertWordDefinitionSchema = createInsertSchema(wordDefinitions, {
  examples: z.array(z.string()),
});

export type WordResponse = RouterOutputs["english"]["all"][number];
