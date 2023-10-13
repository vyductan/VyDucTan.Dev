import { z } from "zod";

export const ExampleSchema = z.object({
  name: z.string(),
});

export type ExampleParams = z.infer<typeof ExampleSchema>;
