"use client";

import { RouterProvider } from "@tanstack/react-router";

import { router } from "~/routes";
import { TRPCReactProvider } from "~/trpc/react";

export const Providers = () => {
  return (
    <TRPCReactProvider>
      <RouterProvider router={router} />
    </TRPCReactProvider>
  );
};
