import { authRouter } from "./auth/router";
import { projectsRouter } from "./projects/router";
import { wordsRouter } from "./router/words";
import { tasksRouter } from "./tasks/router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  words: wordsRouter,
  projects: projectsRouter,
  tasks: tasksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
