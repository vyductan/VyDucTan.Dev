import { Fragment } from "react";
import { createRootRouteWithContext } from "@tanstack/react-router";

export const RootRoute = createRootRouteWithContext()({
  component: Fragment,
});
