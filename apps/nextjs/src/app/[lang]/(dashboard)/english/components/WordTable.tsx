import type { WordResponse } from "@vyductan/api/types";
import type { TableColumnDef } from "@vyductan/components";
import { Table } from "@vyductan/components";

import { api } from "~/trpc/react";

export const WordTable = () => {
  const [words] = api.english.all.useSuspenseQuery();

  return <Table columns={columns} data={words} />;
};

const columns: TableColumnDef<WordResponse>[] = [
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
    render: (value) => {
      return (
        <ul className="list-inside list-disc">
          {value.map((x, idx) => (
            <li key={idx}>
              <span className="-ml-2">{x}</span>
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
];
