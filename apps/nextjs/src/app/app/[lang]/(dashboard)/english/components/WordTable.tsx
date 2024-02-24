"use client";

import { useState } from "react";

import type { WordResponse } from "@vyductan/api/types";
import type { TableColumnDef } from "@vyductan/ui";
import { SpeakerIcon } from "@vyductan/tts";
import { AlertModal, Button, message, Table } from "@vyductan/ui";

import { api } from "~/trpc/react";
import { WordModalForm } from "./WordModalForm";

export const WordTable = () => {
  const [words] = api.english.all.useSuspenseQuery();
  const [currentRow, setCurrentRow] = useState<WordResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const utils = api.useUtils();
  const deleteWord = api.english.delete.useMutation({
    onSuccess: async () => {
      message.success("Deleted");
      setCurrentRow(undefined);
      setIsDeleteModalOpen(false);
      await utils.english.all.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return (
    <>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Add
      </Button>

      <Table
        columns={[
          ...columns,
          {
            render: ({ record }) => {
              return (
                <>
                  <Button
                    onClick={() => {
                      setCurrentRow(record);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentRow(record);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </>
              );
            },
          } satisfies TableColumnDef<WordResponse>,
        ]}
        dataSource={words}
      />
      <WordModalForm
        id={currentRow?.id}
        isOpen={isModalOpen}
        onCancel={() => {
          setCurrentRow(undefined);
          setIsModalOpen(false);
        }}
        onOpenChange={setIsModalOpen}
      />
      <AlertModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Confirm delete"
        description="Are you sure you want to delete this word?"
        okLoading={deleteWord.isPending}
        onConfirm={() => {
          currentRow && deleteWord.mutate(currentRow?.id);
        }}
      />
    </>
  );
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
    render: ({ value }) => {
      return (
        <ul className="list-inside list-disc">
          {value.map((x, idx) => (
            <li key={idx} className="relative flex">
              <SpeakerIcon
                className="absolute left-0 top-[3px] size-3.5"
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
