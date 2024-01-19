import { z } from "zod";

import { eq, schema } from "../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { insertWordDefinitionSchema } from "./types";

export const englishRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.wordDefinitions.findMany({
      orderBy: schema.wordDefinitions.word,
      limit: 10,
    });
  }),

  create: protectedProcedure
    .input(insertWordDefinitionSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.wordDefinitions).values(input);
    }),

  update: protectedProcedure
    .input(
      insertWordDefinitionSchema.merge(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.wordDefinitions)
        .set(input)
        .where(eq(schema.wordDefinitions.id, input.id));
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.wordDefinitions.findFirst({
        where: eq(schema.wordDefinitions.id, input.id),
      });
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.wordDefinitions)
      .where(eq(schema.wordDefinitions.id, input));
  }),
});
