import type {
  RichTextItemResponse,
  SelectPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { z } from "zod";

// type PropertyBase<TType = "title"> = {
//   id: string;
//   type: TType;
// };
// export type NotionPageTitle = PropertyBase<"title"> & {
//   title: RichTextItemResponse[];
// };

const NotionTitleSchema = z.object({
  title: z.array(
    z.object({
      text: z.object({
        content: z.string(),
      }),
      plain_text: z.string(),
    }),
  ),
  name: z.string().nullish(),
});
export type NotionTitle = z.infer<typeof NotionTitleSchema>;

const NotionRichTextSchema = z.object({
  rich_text: z.array(
    z.object({
      text: z.object({
        content: z.string(),
      }),
      plain_text: z.string(),
    }),
  ),
});
// export type NotionRichText = z.infer<typeof NotionRichTextSchema>;
export type NotionRichText = {
  rich_text: RichTextItemResponse[];
};

export type NotionSelectColor = NonNullable<
  SelectPropertyItemObjectResponse["select"]
>["color"];
// type SelectColor = ;
export const NotionSelectSchema = z.object({
  select: z
    .object({
      name: z.string(),
      color: z.enum([
        "default",
        "gray",
        "brown",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "pink",
        "red",
      ]),
      // name: NotionRichTextSchema,
    })
    .nullable(),
});
export type NotionSelect = z.infer<typeof NotionSelectSchema>;
