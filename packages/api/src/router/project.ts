import { z } from "zod";

import { eq, ilike } from "@acme/db";
import { CreateProjectSchema, Project } from "@acme/db/schema";

import { paginationSchema, searchSchema, withPagination } from "../_util/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  notion_list: protectedProcedure
    .input(searchSchema)
    .query(({ ctx, input }) => {
      return ctx.notion.databases.query({
        database_id: "fc753c295eef4fd4a36ec02266ed9f57",
        filter: {
          and: [
            {
              property: "Project Name",
              rich_text: {
                contains: input.query ?? "",
              },
            },
          ],
        },
      });
    }),

  all: protectedProcedure
    .input(searchSchema.merge(paginationSchema))
    .query(({ ctx, input }) => {
      const where = ilike(Project.name, `%${input.query}%`);
      return withPagination(ctx.db, Project, input, where);

      // return ctx.db.query.projects.findMany({
      //   orderBy: desc(schema.projects.createdAt),
      //   where: (t, h) => h.ilike(t.name, `%${input.query}%`),
      //   ...withPagination({ page: input.page, pageSize: input.pageSize }),
      // });
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.Project.findFirst({
        where: eq(Project.id, input.id),
      });
    }),
  bySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.Project.findFirst({
        where: eq(Project.slug, input.slug),
      });
    }),

  create: protectedProcedure
    .input(CreateProjectSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Project).values(input);
    }),

  update: protectedProcedure
    .input(
      CreateProjectSchema.merge(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.update(Project).set(input).where(eq(Project.id, input.id));
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(Project).where(eq(Project.id, input));
  }),
});
