import * as z from "zod";

import {
  CompleteProject,
  CompleteTodoStatus,
  RelatedProjectModel,
  RelatedTodoStatusModel,
} from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const TodoModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  isDone: z.boolean(),
  boardData: jsonSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  statusId: z.string(),
  projectId: z.string().nullish(),
});

export interface CompleteTodo extends z.infer<typeof TodoModel> {
  status: CompleteTodoStatus;
  project?: CompleteProject | null;
}

/**
 * RelatedTodoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoModel: z.ZodSchema<CompleteTodo> = z.lazy(() =>
  TodoModel.extend({
    status: RelatedTodoStatusModel,
    project: RelatedProjectModel.nullish(),
  }),
);
