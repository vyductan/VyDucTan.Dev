import * as z from "zod";

import {
  CompleteProject,
  CompleteProjectStatus,
  RelatedProjectModel,
  RelatedProjectStatusModel,
} from "./index";

export const ProjectTaskModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  statusId: z.string(),
  projectId: z.string(),
});

export interface CompleteProjectTask extends z.infer<typeof ProjectTaskModel> {
  status: CompleteProjectStatus;
  project: CompleteProject;
}

/**
 * RelatedProjectTaskModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectTaskModel: z.ZodSchema<CompleteProjectTask> = z.lazy(
  () =>
    ProjectTaskModel.extend({
      status: RelatedProjectStatusModel,
      project: RelatedProjectModel,
    }),
);
