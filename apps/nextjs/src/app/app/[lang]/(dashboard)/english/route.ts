import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { rootRoute } from "~/routes";

const searchSchema = z.object({
  query: z.string().catch(""),
  page: z.number().catch(1),
  pageSize: z.enum(["10", "20", "30", "40", "50"]).catch("10"),
  // sort: z.enum(["newest", "oldest", "price"]).catch("newest"),
});

export const wordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "words",
  // component: Words,
  validateSearch: searchSchema,
});
