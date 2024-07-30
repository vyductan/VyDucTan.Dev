import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { Fragment } from "react";

export const renderNotionRichText = (x: RichTextItemResponse[]) => {
  return (
    <div>
      {x.map((t, idx) => {
        return <Fragment key={idx}>{renderNotionRichTextItem(t)}</Fragment>;
      })}
    </div>
  );
};
export const renderNotionRichTextItem = (x: RichTextItemResponse) => {
  let className = "";
  if (x.annotations.bold) {
    className += "font-bold";
  }
  if (x.href) {
    return <a href={x.href}>{x.plain_text}</a>;
  }
  return <span className={className}>{x.plain_text}</span>;
};
