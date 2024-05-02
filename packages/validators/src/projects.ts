import { createInsertSchema } from "drizzle-zod";

import { schema } from "@acme/db";

export const insertProjectSchema = createInsertSchema(schema.projects);
