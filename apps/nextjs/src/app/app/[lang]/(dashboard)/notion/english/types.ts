// import { NotionPageTitle } from "~/libs/notion/types";
import type {
  NotionRichText,
  NotionSelect,
  NotionTitle,
} from "@acme/api/libs/notion";

type NotionSelectInfo = {
  select: {
    options: {
      color: string;
      name: string;
    }[];
  };
};
export type WordDbInfo = {
  id: string;
  properties: {
    "Words/Phrases": NotionTitle;
    // IPA: NotionRichText;
    Level: NotionSelectInfo;
    Gram: NotionSelectInfo;
    // Mastery: NotionSelect;
    // English: NotionRichText;
    // Vietnamese: NotionRichText;
    // Examples: NotionRichText;
  };
};

export type WordNotionResponse = {
  id: string;
  properties: {
    "Words/Phrases": NotionTitle;
    IPA: NotionRichText;
    Level: NotionSelect;
    Gram: NotionSelect;
    Mastery: NotionSelect;
    English: NotionRichText;
    Vietnamese: NotionRichText;
    Examples: NotionRichText;
  };
};

export type Word = {
  id: string;
  properties: {
    "Words/Phrases": NotionTitle;
    IPA: NotionRichText;
    Level: NotionSelect;
    Gram: NotionSelect;
    Mastery: NotionSelect;
    English: NotionRichText;
    Vietnamese: NotionRichText;
    Examples: NotionRichText;
  };
};

export type WordAddValues = {
  word: string;
  ipa: string;
  english: string;
  vietnamese: string;
  level: string;
  gram: string;
  mastery: string;
  examples: string;
};
