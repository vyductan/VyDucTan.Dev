"use client";

import type { WordResponse } from "@vyductan/api/types";
import type { TableColumnDef } from "@vyductan/ui";
import { SpeakerIcon } from "@vyductan/tts";
import { Table } from "@vyductan/ui";

import { api } from "~/trpc/react";

export const WordTable = () => {
  const [words] = api.english.all.useSuspenseQuery();

  return <Table columns={columns} dataSource={words} />;
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
            <li key={idx} className="relative flex">
              <SpeakerIcon
                className="absolute left-0 top-[3px] h-3.5 w-3.5"
                text={x}
              />
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
];
