import * as z from "zod";

import {
  CompleteProjectTask,
  CompleteTodo,
  RelatedProjectTaskModel,
  RelatedTodoModel,
} from "./index";

export const ProjectModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteProject extends z.infer<typeof ProjectModel> {
  tasks: CompleteProjectTask[];
  todos: CompleteTodo[];
}

/**
 * RelatedProjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectModel: z.ZodSchema<CompleteProject> = z.lazy(() =>
  ProjectModel.extend({
    tasks: RelatedProjectTaskModel.array(),
    todos: RelatedTodoModel.array(),
  }),
);
