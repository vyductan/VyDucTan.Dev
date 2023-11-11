import { Client } from "@notionhq/client";

import { env } from "~/env.mjs";

// Initializing a client
const notion = new Client({
  auth: env.NOTION_TOKEN,
});

export default async function DocsPage() {
  const x = await notion.databases.retrieve({
    database_id: "6c8c1eb787224b19b9d7882335b6930d",
  });
  console.log("xxx", x);
  return <div>Example</div>;
}
