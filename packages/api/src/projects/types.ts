import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import { schema } from "@acme/db";

import type { RouterOutputs } from "..";

export const insertProjectSchema = createInsertSchema(schema.projects);
export type CreateProjectParams = z.infer<typeof insertProjectSchema>;
export type Project = NonNullable<RouterOutputs["projects"]["bySlug"]>;
