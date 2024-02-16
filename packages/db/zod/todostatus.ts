import * as z from "zod";

import { CompleteTodo, RelatedTodoModel } from "./index";

export const TodoStatusModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteTodoStatus extends z.infer<typeof TodoStatusModel> {
  todos: CompleteTodo[];
}

/**
 * RelatedTodoStatusModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoStatusModel: z.ZodSchema<CompleteTodoStatus> = z.lazy(
  () =>
    TodoStatusModel.extend({
      todos: RelatedTodoModel.array(),
    }),
);
