"use client";

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isFullPage } from "@notionhq/client";
import { format } from "date-fns";

import { InputSearch } from "@acme/ui/input";
import { PageContainer } from "@acme/ui/pro/page-container";

import { DEFAULT_DATE_FORMAT } from "~/libs/date-fns";
import { api } from "~/trpc/react";
import { TodoTable } from "./_components/todo-table";

export default function TodoPage({
  searchParams,
}: {
  searchParams: { query: string; pageSize: number; page: number };
}) {
  const infoQuery = api.tasks.notion_retrieve.useQuery();
  const { data } = api.tasks.notion_list.useQuery(
    {
      ...searchParams,
      sortBy: "Due",
      sortOrder: "descending",
      status: ["Not started", "In progress"],
    },
    // {
    //   initialData: {
    //     data: [],
    //     pagination: {
    //       total: 0,
    //       page: 1,
    //       pageSize: 0,
    //     },
    //   },
    // },
  );

  if (!data || !infoQuery.data) return <>No Data</>;
  // console.log("data", data);
  const groupByDueObject: Record<string, PageObjectResponse[]> = {};

  const addProp = (dueDate: string, item: PageObjectResponse) => {
    // let group = groupByDueObj[dueDate];
    // if(groupByDueObj[dueDate]){
    // }
    // const x = groupByDueObj[dueDate]
    if (groupByDueObject[dueDate]) {
      groupByDueObject[dueDate].push(item);
      // group.push(item);
    } else {
      groupByDueObject[dueDate] = [item];
      // group = [item];
    }
  };
  for (const x of data.results) {
    if (isFullPage(x) && x.properties.Due?.type === "date") {
      if (x.properties.Due.date) {
        if (x.properties.Due.date.end) {
          addProp(x.properties.Due.date.end, x);
        } else {
          addProp(x.properties.Due.date.start, x);
        }
      } else {
        addProp("null", x);
      }
    }
  }
  console.log("xxxx", groupByDueObject, infoQuery);
  return (
    <PageContainer>
      <InputSearch placeholder="Search tasks..." />
      {Object.entries(groupByDueObject).map(([k, v]) => {
        return (
          <div key={k}>
            <div>{k === "null" ? "null" : format(k, DEFAULT_DATE_FORMAT)}</div>
            <TodoTable properties={infoQuery.data.properties} data={v} />
          </div>
        );
      })}
    </PageContainer>
  );
}
