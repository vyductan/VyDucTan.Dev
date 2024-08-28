import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { WordsTable } from "@acme/db/schema";

export const AddWordSchema = createInsertSchema(WordsTable, {
  examples: z.array(z.string()),
}).omit({
  id: true,
});
