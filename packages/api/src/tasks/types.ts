import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import type { RouterOutputs } from "..";
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
      estimatedDuration: z
        .object({
          start: z.date(),
          end: z.date(),
        })
        .optional(),
    }),
  );
export type Task = NonNullable<RouterOutputs["tasks"]["byId"]>;
