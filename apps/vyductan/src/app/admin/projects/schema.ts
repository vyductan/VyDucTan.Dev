import { z } from "zod";

export const AddProjectSchema = z.object({
  name: z.string(),
});
export type AddProjectParams = z.infer<typeof AddProjectSchema>;

export const GetProjectByIdSchema = z.object({
  id: z.string(),
});
export type GetProjectByIdParams = z.infer<typeof GetProjectByIdSchema>;

export const AddProjectTaskSchema = z.object({
  name: z.string(),
});
export type AddProjectTaskParams = z.infer<typeof AddProjectTaskSchema>;

export const AddProjectStatusSchema = z.object({
  name: z.string(),
});
export type AddProjectStatusParams = z.infer<typeof AddProjectStatusSchema>;

export const AddProjectStatusGroupSchema = z.object({
  name: z.string(),
});
export type AddProjectStatusGroupParams = z.infer<
  typeof AddProjectStatusGroupSchema
>;
