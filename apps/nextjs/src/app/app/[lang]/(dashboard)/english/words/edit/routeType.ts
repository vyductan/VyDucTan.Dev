import type { DynamicRoute } from "next-typesafe-url";
import { z } from "zod";

export const Route = {
  // routeParams: z.object({
  //   productID: z.number(),
  // }),
  searchParams: z.object({
    wordId: z.string(),
    // location: z.enum(["us", "eu"]).optional(),
    // userInfo: z.object({
    //   name: z.string(),
    //   age: z.number(),
    // }),
  }),
} satisfies DynamicRoute;
export type RouteType = typeof Route;
