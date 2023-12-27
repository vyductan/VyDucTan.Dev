import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import type { RouterOutputs } from "../root";
import { projects } from "./schema";

export const insertProjectSchema = createInsertSchema(projects);
export type CreateProjectParams = z.infer<typeof insertProjectSchema>;

export type ProjectResponse = RouterOutputs["projects"]["all"][number];
