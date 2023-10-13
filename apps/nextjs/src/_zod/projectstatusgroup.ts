import * as z from "zod";

import { CompleteProjectStatus, RelatedProjectStatusModel } from "./index";

export const ProjectStatusGroupModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteProjectStatusGroup
  extends z.infer<typeof ProjectStatusGroupModel> {
  statusList: CompleteProjectStatus[];
}

/**
 * RelatedProjectStatusGroupModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectStatusGroupModel: z.ZodSchema<CompleteProjectStatusGroup> =
  z.lazy(() =>
    ProjectStatusGroupModel.extend({
      statusList: RelatedProjectStatusModel.array(),
    }),
  );
