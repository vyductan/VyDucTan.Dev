import type { TRPCRouterRecord } from "@trpc/server";
import { load } from "cheerio";
import { subDays } from "date-fns";
import { read, request } from "httpx";
import { z } from "zod";

import { eq } from "@acme/db";
import { AddWordSchema, Word } from "@acme/db/schema";

import { paginationSchema, searchSchema } from "../_util/query";
import { protectedProcedure } from "../trpc";

export const wordRouter = {
  all: protectedProcedure
    .input(searchSchema.merge(paginationSchema))
    .query(({ ctx }) => {
      return ctx.db.query.Word.findMany({
        orderBy: Word.word,
        limit: 10,
      });
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.Word.findFirst({
        where: (table, { eq }) => eq(table.id, input.id),
      });
    }),

  byCambridge: protectedProcedure
    .input(z.object({ word: z.string() }))
    .query(async ({ input }) => {
      const data: Array<typeof Word.$inferSelect> = [];
      const res = await request(
        "https://dictionary.cambridge.org/dictionary/english/" + input.word,
        {},
      );
      const body = await read(res, "utf-8");
      const $ = load(body);
      const nodes = $("div.dictionary").first().find("div.dsense");
      nodes.first().find();
      nodes.toArray().forEach((x) => {
        const word = {
          word: $(x).find("span.dsense_hw").text(),
          pos: $(x).find("span.dsense_pos").text(),
          gram: $(x).find("span.gc.dgc").text(),
          cefrLevel: $(x).find("span.def-info.ddef-info").text().toLowerCase(),
          definition: $(x).find("div.def.ddef_d.db").text().replace(":", ""),
          examples: $(x)
            .find("div.examp.dexamp")
            .toArray()
            .map((el) => ({
              highlight: $(el).find("span.lu.dlu").text(),
              text: $(el).find("span.eg.deg").text(),
            })),
        } as unknown as typeof Word.$inferSelect;
        data.push(word);
      });
      return data;
    }),

  create: protectedProcedure.input(AddWordSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(Word).values(input);
  }),

  update: protectedProcedure
    .input(
      AddWordSchema.merge(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.update(Word).set(input).where(eq(Word.id, input.id));
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(Word).where(eq(Word.id, input));
  }),

  getWordToLearn: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.Word.findFirst({
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
      AddWordSchema.pick({
        mastery: true,
      }).merge(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(Word)
        .set({
          ...input,
          lastLearnedAt: new Date(),
        })
        .where(eq(Word.id, input.id));
    }),
} satisfies TRPCRouterRecord;
