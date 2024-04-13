import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

type PropertyBase<TType = "title"> = {
  id: string;
  type: TType;
};
export type NotionPageTitle = PropertyBase<"title"> & {
  title: RichTextItemResponse[];
};
