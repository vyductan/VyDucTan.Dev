import { z } from "zod";

import { and, eq, ilike, schema } from "@acme/db";

import {
  countQuery,
  paginationSchema,
  searchSchema,
  withPaginationQuery,
} from "../_util/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { insertTaskSchema } from "./types";

export const tasksRouter = createTRPCRouter({
  all: protectedProcedure
    .input(
      z
        .object({
          projectId: z.string().optional(),
          projectSlug: z.string().optional(),
        })
        .merge(searchSchema)
        .merge(paginationSchema),
    )
    .query(async ({ ctx, input }) => {
      const where = and(
        input.projectId
          ? eq(schema.tasks.projectId, input.projectId)
          : undefined,
        ilike(schema.tasks.name, `%${input.query}%`),
      );

      const [data, count] = await Promise.all([
        ctx.db.query.tasks.findMany({
          limit: input.pageSize,
          offset: (input.page - 1) * input.pageSize,
          where,
          with: {
            project: true,
          },
        }),
        countQuery(ctx.db, schema.tasks, where),
      ]);
      // return withPagination(ctx.db, schema.tasks, input, where);
      return withPaginationQuery(data, count, input);
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
