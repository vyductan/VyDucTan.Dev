import type { RadioOption } from "@acme/ui/radio";
import { WordClass } from "@acme/api/words";

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
