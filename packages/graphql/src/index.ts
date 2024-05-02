import { mergeSchemas } from "@graphql-tools/schema";
import { buildSchema } from "drizzle-graphql";
import { initGraphQLTada } from "gql.tada";

import { db } from "@acme/db";

import type { introspection } from "./graphql-env.d.ts";
import { getSchema } from "./schema";

const { schema } = buildSchema(db);
const mergedSchema = mergeSchemas({
  schemas: [schema, getSchema()],
  // typeDefs: /* GraphQL */ `
  //   type ExtraType {
  //     foo: String
  //   }
  // `,
  // resolvers: {
  //   ExtraType: {
  //     foo: () => 'FOO'
  //   }
  // }
});
export { mergedSchema as schema };

export const graphql = initGraphQLTada<{
  introspection: introspection;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
