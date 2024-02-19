import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import type { RouterOutputs } from "../root";
import { projects } from "./schema";

export const insertProjectSchema = createInsertSchema(projects);
export type CreateProjectParams = z.infer<typeof insertProjectSchema>;

export type ProjectResponse = RouterOutputs["projects"]["all"][number];
export type ProjectTasksResponse = NonNullable<
  RouterOutputs["projects"]["bySlug"]
>["tasks"][number];
