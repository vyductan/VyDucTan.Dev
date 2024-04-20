import type { Client as UrqlClient } from "urql";
import {
  createRootRouteWithContext,
  createRouter,
} from "@tanstack/react-router";

import { urqlClient } from "~/libs/urql";
import { RootLayout } from "~/pages/layout";
import { wordAddRoute } from "~/pages/words/add/page";
import { wordsRoute } from "~/pages/words/pages";

export const rootRoute = createRootRouteWithContext<{
  urqlClient: UrqlClient;
}>()({
  component: RootLayout,
});

const routeTree = rootRoute.addChildren([
  // postsRoute.addChildren([postRoute, postsIndexRoute]),
  wordsRoute.addChildren([wordAddRoute]),
  // wordsRoute.addChildren([wordAddRoute]),
  // indexRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  context: {
    urqlClient,
  },
});
// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
