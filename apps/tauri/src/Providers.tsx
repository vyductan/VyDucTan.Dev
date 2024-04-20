import { RouterProvider } from "@tanstack/react-router";
import { Provider as UrqlProvider } from "urql";

import { router } from "~/libs/routes";
import { urqlClient } from "~/libs/urql";

export const Providers = () => {
  return (
    <UrqlProvider value={urqlClient}>
      <RouterProvider router={router} />
    </UrqlProvider>
  );
};
