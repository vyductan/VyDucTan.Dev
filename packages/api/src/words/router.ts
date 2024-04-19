import type { TRPCRouterRecord } from "@trpc/server";
import { subDays } from "date-fns";
import { z } from "zod";

import { eq, schema } from "@acme/db";

import { protectedProcedure } from "../trpc";
import { insertWordSchema } from "./types";

export const wordsRouter = {
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.words.findMany({
      orderBy: schema.words.word,
      limit: 10,
    });
  }),

  create: protectedProcedure
    .input(insertWordSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.words).values(input);
    }),

  update: protectedProcedure
    .input(
      insertWordSchema.partial().merge(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.words)
        .set(input)
        .where(eq(schema.words.id, input.id));
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.words.findFirst({
        where: (table, { eq }) => eq(table.id, input.id),
      });
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.words).where(eq(schema.words.id, input));
  }),

  getWordToLearn: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.words.findFirst({
      where: (t, { and, lt, ne, or, isNull }) =>
        and(
          ne(t.mastery, "5"),
          or(
            isNull(t.lastLearnedAt),
            lt(t.lastLearnedAt, subDays(new Date(), 3)),
          ),
        ),
    });
  }),
  mastery: protectedProcedure
    .input(
      insertWordSchema
        .pick({
          mastery: true,
        })
        .partial()
        .merge(
          z.object({
            id: z.string(),
          }),
        ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.words)
        .set({
          ...input,
          lastLearnedAt: new Date(),
        })
        .where(eq(schema.words.id, input.id));
    }),
} satisfies TRPCRouterRecord;
