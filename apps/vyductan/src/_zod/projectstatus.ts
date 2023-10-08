import * as z from "zod";

import {
  CompleteProjectStatusGroup,
  CompleteProjectTask,
  RelatedProjectStatusGroupModel,
  RelatedProjectTaskModel,
} from "./index";

export const ProjectStatusModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  groupId: z.string(),
});

export interface CompleteProjectStatus
  extends z.infer<typeof ProjectStatusModel> {
  tasks: CompleteProjectTask[];
  group: CompleteProjectStatusGroup;
}

/**
 * RelatedProjectStatusModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectStatusModel: z.ZodSchema<CompleteProjectStatus> =
  z.lazy(() =>
    ProjectStatusModel.extend({
      tasks: RelatedProjectTaskModel.array(),
      group: RelatedProjectStatusGroupModel,
    }),
  );
