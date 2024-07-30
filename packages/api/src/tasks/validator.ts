import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { TasksTable } from "./schema";

export const CreateTaskSchema = createInsertSchema(TasksTable, {
  content: z.string(),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
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
