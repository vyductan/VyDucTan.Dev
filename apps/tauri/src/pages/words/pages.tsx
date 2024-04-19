import { createRoute } from "@tanstack/react-router";
import { useQuery } from "urql";

import { WordsQuery } from "@acme/graphql/models/words";
import { Table } from "@acme/ui/antd/table";

import { rootRoute } from "~/routes";

const Words = () => {
  const [results] = useQuery({
    query: WordsQuery,
    variables: {
      limit: 5,
    },
  });
  console.log("??", results);
  let Render = null;

  if (results.data) {
    Render = (
      <Table
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
        dataSource={results.data.words}
      />
    );
  }
  return <>{results.fetching || results.data ? "Loading" : Render}</>;
};

// const Route = createLazyRoute("/posts")({
//   component: Words,
// });

// const route = createRoute({
//   getParent: () => routeTree,
//   path: "/posts",
// }).lazy(() => import(".").then());

export const wordsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "words",
  component: Words,
});
