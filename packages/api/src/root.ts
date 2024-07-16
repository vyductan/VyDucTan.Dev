import { authRouter } from "./auth/router";
import { projectRouter } from "./router/project";
import { taskRouter } from "./router/task";
import { wordRouter } from "./router/word";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  word: wordRouter,
  project: projectRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
