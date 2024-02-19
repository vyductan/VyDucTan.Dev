import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { tasks } from "./schema";

export const insertTaskSchema = createInsertSchema(tasks, {
  content: z.string(),
})
  .omit({
    estimatedStart: true,
    estimatedEnd: true,
  })
  .merge(
    z.object({
      estimatedDuration: z.object({
        start: z.date(),
        end: z.date(),
      }),
    }),
  );
