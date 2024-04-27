import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import "../globals.css";

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
};
