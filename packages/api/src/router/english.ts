// import { desc, schema } from "../db";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc.ts";

export const englishRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.query.wordDefinitions.findMany({
    //   orderBy: desc(schema.wordDefinitions.word),
    //   limit: 10,
    // });
    // return axios.get("https://jsonplaceholder.typicode.com/posts");
    // return ctx.db.query.post.findMany({ orderBy: desc(schema.post.id) });
  }),

  create: protectedProcedure.mutation(({ ctx, input }) => {
    // return ctx.db.insert(schema.wordDefinitions).values(input);
  }),

  // byId: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     // return ctx.db
  //     //   .select()
  //     //   .from(schema.post)
  //     //   .where(eq(schema.post.id, input.id));
  //
  //     return ctx.db.query.post.findFirst({
  //       where: eq(schema.post.id, input.id),
  //     });
  //   }),
  //
  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1),
  //       content: z.string().min(1),
  //     }),
  //   )
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(schema.post).values(input);
  //   }),
  //
  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  // }),
});
