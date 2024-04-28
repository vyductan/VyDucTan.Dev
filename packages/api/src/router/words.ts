import type { TRPCRouterRecord } from "@trpc/server";
import { load } from "cheerio";
import { subDays } from "date-fns";
import httpx from "httpx";
import { z } from "zod";

import { eq, schema } from "@acme/db";
import { insertWordSchema } from "@acme/validators/words";

import { paginationSchema, searchSchema } from "../_util/query";
import { protectedProcedure } from "../trpc";

export const wordsRouter = {
  all: protectedProcedure
    .input(searchSchema.merge(paginationSchema))
    .query(({ ctx }) => {
      return ctx.db.query.words.findMany({
        orderBy: schema.words.word,
        limit: 10,
      });
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.words.findFirst({
        where: (table, { eq }) => eq(table.id, input.id),
      });
    }),

  byCambridge: protectedProcedure
    .input(z.object({ word: z.string() }))
    .query(async ({ input }) => {
      const data: Array<typeof schema.words.$inferSelect> = [];
      const res = await httpx.request(
        "https://dictionary.cambridge.org/dictionary/english/" + input.word,
        {},
      );
      const body = await httpx.read(res, "utf-8");
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
        } as unknown as typeof schema.words.$inferSelect;
        data.push(word);
      });
      return data;
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
