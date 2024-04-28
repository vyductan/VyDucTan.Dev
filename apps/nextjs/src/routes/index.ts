import { createRouter } from "@tanstack/react-router";

import { DictionaryWordRoute } from "~/app/app/[lang]/(dashboard)/english/dictionary/[word]/routeDef";
import { EnglishRoute } from "~/app/app/[lang]/(dashboard)/english/routeDef";
import { WordNewRoute } from "~/app/app/[lang]/(dashboard)/english/words/new/routeDef";
import { WordsRoute } from "~/app/app/[lang]/(dashboard)/english/words/routeDef";
import { RootRoute } from "./root";

const routeTree = RootRoute.addChildren([
  // postsRoute.addChildren([postRoute, postsIndexRoute]),
  DictionaryWordRoute,
  EnglishRoute.addChildren([WordsRoute.addChildren([WordNewRoute])]),
  // englishRoute.addChildren([wordsRoute.addChildren([wordNewRoute])]),
  // wordsRoute.addChildren([wordAddRoute]),
  // indexRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
