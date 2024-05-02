import { z } from "zod";

import { createRoute } from "~/routes/createRouter";
import { RootRoute } from "~/routes/root";

const searchSchema = z.object({
  query: z.string().catch(""),
  page: z.number().catch(1),
  pageSize: z.union([z.literal(10), z.literal(20)]).catch(10),
});

export const ProjectsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "projects",
  validateSearch: searchSchema,
});
