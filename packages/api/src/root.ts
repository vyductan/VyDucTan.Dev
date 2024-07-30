import { englishRouter } from "./english/router";
import { projectsRouter } from "./projects/router";
import { authRouter } from "./router/auth";
import { tasksRouter } from "./tasks/router";
import { createTRPCRouter } from "./trpc";
import { wordsRouter } from "./words/router";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  words: wordsRouter,
  projects: projectsRouter,
  tasks: tasksRouter,
  english: englishRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
