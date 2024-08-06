import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { EnglishAddSchema, WordUpdateSchema } from "./validator";

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
            // IPA: input.IPA,
            // X: "123",
            //   Z: {
            //   rich_text: [{text: {content: "123"}}]
            // },
            // K: null,
            // X: {
            //   // type: "title",
            //   title: [{text: {content: "123"}}]
            // },
            // G: input.IPA
            // ...input,
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
        // const [info, data] = await Promise.all([
        //   ctx.notion.databases.retrieve({
        //     database_id: ENGLISH_NOTION_DB_ID,
        //   }),
        //   ctx.notion.databases.query({
        //     database_id: ENGLISH_NOTION_DB_ID,
        //   }),
        // ]);
        // return { info, data };
      }),
    update: protectedProcedure
      .input(
        WordUpdateSchema.merge(
          z.object({
            id: z.string(),
          }),
        ),
      )
      .mutation(async ({ ctx, input: { id, ...input } }) => {
        return ctx.notion.pages.update({
          page_id: id,
          properties: input,
        });
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return ctx.notion.pages.update({
          page_id: input.id,
          archived: true,
        });
      }),
  },
});
