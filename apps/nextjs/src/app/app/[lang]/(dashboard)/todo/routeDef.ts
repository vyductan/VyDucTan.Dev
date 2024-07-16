import { z } from "zod";

import { createRoute } from "~/routes/createRouter";
import { RootRoute } from "~/routes/root";

export const TodoRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/todo",
  validateSearch: z.object({
    query: z.string().catch(""),
    page: z.number().catch(1),
    pageSize: z
      .union([z.literal(10), z.literal(20), z.literal(50), z.literal(100)])
      .catch(50),
  }),
});
