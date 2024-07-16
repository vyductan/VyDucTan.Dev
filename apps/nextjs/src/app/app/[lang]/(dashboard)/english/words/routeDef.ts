// import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { createRoute } from "~/routes/createRouter";
import { EnglishRoute } from "../routeDef";

const searchSchema = z.object({
  query: z.string().catch(""),
  page: z.number().catch(1),
  pageSize: z.union([z.literal(10), z.literal(20)]).catch(10),
  // sort: z.enum(["newest", "oldest", "price"]).catch("newest"),
});

export const WordsRoute = createRoute({
  getParentRoute: () => EnglishRoute,
  path: "words",
  validateSearch: searchSchema,
});
// WordsRoute.useSearch = (() => {
//   const searchParams =
//    {
//     page: 1,
//     pageSize: 10,
//     query: "",
//   }
//   return searchParams
// }) as typeof WordsRoute.useSearch
