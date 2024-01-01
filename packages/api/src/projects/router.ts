import { z } from "zod";

import { desc, eq, schema } from "../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { insertProjectSchema, insertTaskSchema } from "./types";

export const projectsRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany({
      orderBy: desc(schema.projects.createdAt),
      limit: 10,
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
        with: {
          tasks: true,
        },
      });
    }),

  create: protectedProcedure
    .input(insertProjectSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.projects).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.projects).where(eq(schema.projects.id, input));
  }),

  addTask: protectedProcedure
    .input(insertTaskSchema)
    .mutation(({ ctx, input }) => {
      console.log("iiiiii", input);
      return ctx.db.insert(schema.tasks).values(input);
    }),
});
