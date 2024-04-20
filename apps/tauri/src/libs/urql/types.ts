import type { DocumentDecoration } from "gql.tada";
import type { AnyVariables } from "urql";

export type MutationVariablesOf<Document> =
  Document extends DocumentDecoration<
    unknown,
    infer Variables extends { input: AnyVariables }
  >
    ? Variables["input"]
    : never;
