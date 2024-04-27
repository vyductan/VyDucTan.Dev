import { RouterProvider } from "@tanstack/react-router";
import { Provider as UrqlProvider } from "urql";

import { router } from "~/libs/routes";
import { TRPCReactProvider } from "~/libs/trpc/react";
import { urqlClient } from "~/libs/urql";

export const Providers = () => {
  return (
    <TRPCReactProvider>
      <UrqlProvider value={urqlClient}>
        <RouterProvider router={router} />
      </UrqlProvider>
    </TRPCReactProvider>
  );
};
