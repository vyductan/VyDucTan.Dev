import { CEFRLevel, VocabularyMastery, WordForm } from "@prisma/client";
import * as z from "zod";

export const VocabularyModel = z.object({
  id: z.string(),
  vocabulary: z.string(),
  form: z.nativeEnum(WordForm).nullish(),
  level: z.nativeEnum(CEFRLevel).nullish(),
  ipa: z.string().nullish(),
  meaning: z.string().nullish(),
  vietnamese: z.string(),
  mastery: z.nativeEnum(VocabularyMastery),
  lastReviewed: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
