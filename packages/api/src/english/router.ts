import { createTRPCRouter, protectedProcedure } from "../trpc";
import { EnglishAddSchema } from "./validator";

const ENGLISH_NOTION_DB_ID = "510342fff59a4474a3e764bf18a842c7";
export const englishRouter = createTRPCRouter({
  notion: {
    list: protectedProcedure.query(async ({ ctx }) => {
      const [info, data] = await Promise.all([
        ctx.notion.databases.retrieve({
          database_id: ENGLISH_NOTION_DB_ID,
        }),
        ctx.notion.databases.query({
          database_id: ENGLISH_NOTION_DB_ID,
        }),
      ]);
      return { info, data };
    }),
    insert: protectedProcedure
      .input(EnglishAddSchema)
      .mutation(async ({ ctx, input }) => {
        return ctx.notion.pages.create({
          parent: { database_id: ENGLISH_NOTION_DB_ID },
          properties: {
            ...input,
            Mastery: {
              select: {
                name: "1",
              },
            },
          },
        });
        // return ctx.notion.pages.create({
        //   parent: { database_id: ENGLISH_NOTION_DB_ID },
        //   properties: {
        //     "Words/Phrases": {
        //       title: [
        //         {
        //           text: {
        //             content: "",
        //           },
        //         },
        //       ],
        //     },
        //   },
        // });
        const [info, data] = await Promise.all([
          ctx.notion.databases.retrieve({
            database_id: ENGLISH_NOTION_DB_ID,
          }),
          ctx.notion.databases.query({
            database_id: ENGLISH_NOTION_DB_ID,
          }),
        ]);
        return { info, data };
      }),
  },
});
