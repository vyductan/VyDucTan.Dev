import type { Client as UrqlClient } from "urql";
import { createRootRouteWithContext } from "@tanstack/react-router";

import { RootLayout } from "~/pages/layout";
import { wordsRoute } from "~/pages/words/pages";

export const rootRoute = createRootRouteWithContext<{
  urqlClient: UrqlClient;
}>()({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  // postsRoute.addChildren([postRoute, postsIndexRoute]),
  wordsRoute,
  // indexRoute,
]);
