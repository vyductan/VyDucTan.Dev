"use client";

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isFullPage } from "@notionhq/client";
import { format } from "date-fns";

import { Search } from "@acme/ui/input";
import { PageContainer } from "@acme/ui/pro/page-container";

import { DEFAULT_DATE_FORMAT } from "~/libs/date-fns";
import { api } from "~/trpc/react";
import { TodoTable } from "./_components/TodoTable";
import { TodoRoute } from "./routeDef";

export default function TodoPage() {
  const searchParams = TodoRoute.useSearch();
  const infoQuery = api.task.notion_retrieve.useQuery();
  const { data } = api.task.notion_list.useQuery(
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
  const groupByDueObj: Record<string, PageObjectResponse[]> = {};

  const addProp = (dueDate: string, item: PageObjectResponse) => {
    // let group = groupByDueObj[dueDate];
    // if(groupByDueObj[dueDate]){
    // }
    // const x = groupByDueObj[dueDate]
    if (groupByDueObj[dueDate]) {
      groupByDueObj[dueDate]?.push(item);
      // group.push(item);
    } else {
      groupByDueObj[dueDate] = [item];
      // group = [item];
    }
  };
  data.results.forEach((x) => {
    if (isFullPage(x)) {
      if (x.properties.Due?.type === "date") {
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
  });
  console.log("xxxx", groupByDueObj, infoQuery);
  return (
    <PageContainer>
      <Search placeholder="Search tasks..." />
      {Object.entries(groupByDueObj).map(([k, v]) => {
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
