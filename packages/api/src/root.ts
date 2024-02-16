import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { authRouter } from "./auth/router";
// import { contactRouter } from "./contact/router.ts_";
import { englishRouter } from "./english/router";
import { imagesRouter } from "./images/router";
import { projectsRouter } from "./projects/router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  // contact: contactRouter,
  english: englishRouter,
  images: imagesRouter,
  projects: projectsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
