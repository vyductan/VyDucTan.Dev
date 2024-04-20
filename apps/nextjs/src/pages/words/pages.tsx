import { createRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Table } from "antd";
import { z } from "zod";

import { Button } from "@acme/ui/antd/button";
import { genTablePagination } from "@acme/ui/table";

import { rootRoute } from "~/routes";
import { api } from "~/trpc/react";

const Words = () => {
  const navigate = useNavigate();
  const searchParams = wordsRoute.useSearch();
  const pagination = genTablePagination(searchParams);

  const allWord = api.words.all.useQuery(void 0, {
    initialData: [],
  });
  let Render = null;

  if (allWord.isFetching) {
    Render = "loading";
  }
  Render = (
    <>
      <Button
        onClick={async () => {
          await navigate({ to: "/words/new", search: searchParams });
        }}
      >
        New
      </Button>
      <Table
        rowKey="id"
        columns={[
          {
            dataIndex: "word",
            title: "Word",
          },
          {
            dataIndex: "class",
            title: "Class",
          },
          {
            dataIndex: "cefrLevel",
            title: "CEFR",
          },
          {
            dataIndex: "english",
            title: "English",
          },
          {
            dataIndex: "examples",
            title: "Examples",
            render: (_, record) => {
              return (
                <ul className="list-inside list-disc">
                  {record.examples.map((x, idx) => (
                    <li key={idx} className="relative flex">
                      {/* <SpeakerIcon */}
                      {/*   className="absolute left-0 top-[3px] size-3.5" */}
                      {/*   text={x} */}
                      {/* /> */}
                      <span className="indent-5">{x}</span>
                    </li>
                  ))}
                </ul>
              );
            },
          },
          {
            dataIndex: "vietnamese",
            title: "Vietnamese",
          },
        ]}
        dataSource={allWord.data}
        onScroll={(event) => {
          console.log("eeee", event);
        }}
        pagination={pagination}
      />
      <Outlet />
    </>
  );
  return <>{Render}</>;
};

// const Route = createLazyRoute("/posts")({
//   component: Words,
// });

// const route = createRoute({
//   getParent: () => routeTree,
//   path: "/posts",
// }).lazy(() => import(".").then());

const searchSchema = z.object({
  query: z.string().catch(""),
  page: z.number().catch(1),
  pageSize: z.enum(["10", "20", "30", "40", "50"]).catch("10"),
  // sort: z.enum(["newest", "oldest", "price"]).catch("newest"),
});

export const wordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "words",
  component: Words,
  validateSearch: searchSchema,
});
