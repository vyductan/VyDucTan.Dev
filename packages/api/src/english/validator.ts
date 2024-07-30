import { z } from "zod";

const NotionTitleSchema = z.object({
  title: z.array(
    z.object({
      text: z.object({
        content: z.string(),
      }),
    }),
  ),
});
const NotionRichTextSchema = z.object({
  rich_text: z.array(
    z.object({
      text: z.object({
        content: z.string(),
      }),
    }),
  ),
});
const NotionSelectSchema = z.object({
  select: z.object({
    name: z.string(),
  }),
});
export const EnglishAddSchema = z.object({
  "Words/Phrases": NotionTitleSchema,
  IPA: NotionRichTextSchema.nullish(),
  English: NotionRichTextSchema.nullish(),
  Vietnamese: NotionRichTextSchema,
  Example: NotionRichTextSchema,
  Gram: NotionSelectSchema.nullish(),
  Level: NotionSelectSchema.nullish(),
});
