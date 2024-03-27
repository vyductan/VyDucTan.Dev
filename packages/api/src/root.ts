import { authRouter } from "./auth/router";
import { englishRouter } from "./english/router";
import { projectsRouter } from "./projects/router";
import { tasksRouter } from "./tasks/router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  english: englishRouter,
  projects: projectsRouter,
  tasks: tasksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
