import { z } from "zod";

export const searchSchema = z.object({
  query: z.string().catch(""),
  page: z.number().catch(1),
  pageSize: z
    .union([z.literal(10), z.literal(20), z.literal(50), z.literal(100)])
    .catch(10),
});
