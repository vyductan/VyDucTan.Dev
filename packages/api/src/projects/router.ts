import { z } from "zod";

import { desc, eq, schema } from "../_db";
import { paginationSchema, searchSchema, withPagination } from "../_util/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { insertProjectSchema } from "./types";

export const projectsRouter = createTRPCRouter({
  all: protectedProcedure
    .input(searchSchema.merge(paginationSchema))
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findMany({
        orderBy: desc(schema.projects.createdAt),
        where: (t, h) => h.ilike(t.name, `%${input.query}%`),
        ...withPagination({ page: input.page, pageSize: input.pageSize }),
      });
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findFirst({
        where: eq(schema.projects.id, input.id),
      });
    }),
  bySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findFirst({
        where: eq(schema.projects.slug, input.slug),
      });
    }),

  create: protectedProcedure
    .input(insertProjectSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.projects).values(input);
    }),

  update: protectedProcedure
    .input(
      insertProjectSchema.merge(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.projects)
        .set(input)
        .where(eq(schema.projects.id, input.id));
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.projects).where(eq(schema.projects.id, input));
  }),
});
