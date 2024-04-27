import type { WordCEFRLevel, WordClass, WordMastery } from "@acme/api/words";
import type { RadioOption } from "@acme/ui/radio";

export const wordClassOptions: RadioOption<WordClass>[] = [
  {
    value: "",
    label: "None",
  },
  {
    value: "noun",
    label: "Noun",
  },
  {
    value: "verb",
    label: "Verb",
  },
  {
    value: "adj",
    label: "Adjective",
  },
  {
    value: "adv",
    label: "Adverb",
  },
  {
    value: "phrase",
    label: "Phrase",
  },
];

export const cerfLevelOptions: RadioOption<WordCEFRLevel>[] = [
  {
    value: "",
    label: "None",
  },
  {
    value: "a1",
    label: "A1",
  },
  {
    value: "a2",
    label: "A2",
  },
  {
    value: "b1",
    label: "B1",
  },
  {
    value: "b2",
    label: "B2",
  },
  {
    value: "c1",
    label: "C1",
  },
  {
    value: "c2",
    label: "C2",
  },
];

export const wordMasteryOptions: RadioOption<WordMastery>[] = [
  {
    value: "1",
    label: "*",
  },
  {
    value: "2",
    label: "**",
  },
  {
    value: "3",
    label: "***",
  },
  {
    value: "4",
    label: "****",
  },
  {
    value: "5",
    label: "*****",
  },
];
