import { z } from "zod";

import { desc, eq, schema } from "../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { insertTaskSchema } from "./types";

export const tasksRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.tasks.findMany({
      orderBy: desc(schema.tasks.createdAt),
      limit: 10,
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.tasks.findFirst({
        where: eq(schema.tasks.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(insertTaskSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.tasks).values(input);
    }),

  update: protectedProcedure
    .input(
      insertTaskSchema.merge(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.tasks)
        .set(input)
        .where(eq(schema.tasks.id, input.id));
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.tasks).where(eq(schema.tasks.id, input));
  }),
});
