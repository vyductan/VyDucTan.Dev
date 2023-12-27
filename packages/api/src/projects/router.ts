import { z } from "zod";

// import { desc, eq, schema } from "../db.ts_.ts_.ts_";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { insertProjectSchema } from "./types";

export const projectsRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.query.projects.findMany({
    //   orderBy: desc(schema.projects.createdAt),
    //   limit: 10,
    // });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      // return ctx.db.query.projects.findFirst({
      //   where: eq(schema.projects.id, input.id),
      // });
    }),

  create: protectedProcedure
    .input(insertProjectSchema)
    .mutation(({ ctx, input }) => {
      // return ctx.db.insert(schema.projects).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    // return ctx.db.delete(schema.projects).where(eq(schema.projects.id, input));
  }),
});
