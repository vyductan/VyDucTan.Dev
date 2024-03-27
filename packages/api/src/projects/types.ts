import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import type { RouterOutputs } from "..";
import { projects } from "./schema";

export const insertProjectSchema = createInsertSchema(projects);
export type CreateProjectParams = z.infer<typeof insertProjectSchema>;
export type Project = NonNullable<RouterOutputs["projects"]["bySlug"]>;
