import { createRoute } from "@tanstack/react-router";

import { RootRoute } from "~/routes/root";

export const WordDetailRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/english/words/$word",
});
const x = WordDetailRoute.useParams();
x.word;
