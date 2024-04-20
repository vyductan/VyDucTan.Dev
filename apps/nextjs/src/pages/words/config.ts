import type { AddWordMutation } from "@acme/graphql/models/words";
import type { RadioOption } from "@acme/ui/radio";

import type { MutationVariablesOf } from "~/libs/urql/types";

export const wordClassOptions: RadioOption<
  MutationVariablesOf<typeof AddWordMutation>["class"]
>[] = [
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
