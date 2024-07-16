import type { schema } from "@acme/db";

export type WordClass = (typeof schema.wordClassEnum.enumValues)[number];
export type WordCEFRLevel = (typeof schema.cefrLevelEnum.enumValues)[number];
export type WordMastery = (typeof schema.masteryEnum.enumValues)[number];
