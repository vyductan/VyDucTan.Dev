"use client";

import { RouterProvider } from "@tanstack/react-router";

import { router } from "~/routes";

export const Providers = () => {
  return <RouterProvider router={router} />;
};
