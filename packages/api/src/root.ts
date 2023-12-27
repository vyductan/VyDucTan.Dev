import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { authRouter } from "./auth/router";
// import { contactRouter } from "./contact/router.ts_";
import { englishRouter } from "./english/router";
import { projectsRouter } from "./projects/router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  // contact: contactRouter,
  english: englishRouter,
  projects: projectsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
