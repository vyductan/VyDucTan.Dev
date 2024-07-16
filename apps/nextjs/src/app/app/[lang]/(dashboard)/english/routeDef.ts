import { createRoute } from "@tanstack/react-router";

import { RootRoute } from "~/routes/root";

export const EnglishRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "english",
});
