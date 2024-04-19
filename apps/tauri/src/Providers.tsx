import { createRouter, RouterProvider } from "@tanstack/react-router";
import {
  cacheExchange,
  fetchExchange,
  Client as UrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { routeTree } from "~/routes";

const urqlClient = new UrqlClient({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' },
  //   };
  // },
});

const router = createRouter({
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

export const Providers = () => {
  return (
    <UrqlProvider value={urqlClient}>
      <RouterProvider router={router} />
    </UrqlProvider>
  );
};
