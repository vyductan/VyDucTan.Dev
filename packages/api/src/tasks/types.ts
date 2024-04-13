import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { schema } from "@acme/db";

import type { RouterOutputs } from "..";

export const insertTaskSchema = createInsertSchema(schema.tasks, {
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
