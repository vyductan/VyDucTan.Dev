import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { schema } from "@acme/db";

export const insertWordSchema = createInsertSchema(schema.words, {
  examples: z.array(z.string()),
});
