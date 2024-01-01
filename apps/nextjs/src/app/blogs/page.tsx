import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Client, isFullPage, isFullPageOrDatabase } from "@notionhq/client";

import { env } from "~/env.mjs";
import { BlogsTable } from "./components/Table";

// Initializing a client
const notion = new Client({
  auth: env.NOTION_TOKEN,
});

export default async function BlogsPage() {
  const x = await notion.databases.query({
    database_id: "6c8c1eb787224b19b9d7882335b6930d",
  });
  console.log("xxx", x);
  return (
    <div>
      {x.results.map((x) => {
        if (x.object === "page" && isFullPage(x)) {
          return x.id;
        }
        return "hh";
      })}
      <BlogsTable
        dataSource={
          x.results.filter(
            (x) => x.object === "page" && isFullPage(x),
          ) as PageObjectResponse[]
        }
      />
    </div>
  );
}
