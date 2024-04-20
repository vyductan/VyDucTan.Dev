"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { RouterOutputs } from "@acme/api";
import type { TableColumnDef } from "@acme/ui/table";
import { AlertModal } from "@acme/ui/alert-modal";
import { Button } from "@acme/ui/button";
import { Table } from "@acme/ui/table";
import { message } from "@acme/ui/toast";

import { SpeakerIcon } from "~/libs/tts";
import { api } from "~/trpc/react";

type Record = RouterOutputs["words"]["all"][number];
export const WordTable = () => {
  const router = useRouter();
  const { data: words } = api.words.all.useQuery(void 0, {
    initialData: [],
  });
  const [currentRow, setCurrentRow] = useState<Record>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const utils = api.useUtils();
  const deleteWord = api.words.delete.useMutation({
    onSuccess: async () => {
      message.success("Deleted");
      setCurrentRow(undefined);
      setIsDeleteModalOpen(false);
      await utils.words.all.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return (
    <>
      <Button primary onClick={() => router.push("/english/new")}>
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
                      router.push("/english/edit?wordId=" + record.id);
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
          } satisfies TableColumnDef<Record>,
        ]}
        dataSource={words}
      />
      <AlertModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Confirm delete"
        description="Are you sure you want to delete this word?"
        okLoading={deleteWord.isPending}
        onConfirm={() => {
          currentRow && deleteWord.mutate(currentRow.id);
        }}
      />
    </>
  );
};

const columns: TableColumnDef<Record>[] = [
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
