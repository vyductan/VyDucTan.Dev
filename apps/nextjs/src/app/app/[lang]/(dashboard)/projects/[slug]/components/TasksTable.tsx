"use client";

import Link from "next/link";

import type { RouterOutputs } from "@acme/api";
import type { TableColumnDef } from "@acme/ui/table";
import { Button } from "@acme/ui/button";
import { EditIcon } from "@acme/ui/icons";
import { Table } from "@acme/ui/table";

import { DeleteTask } from "./DeleteTask";

type TaskTableProps = {
  dataSource: RouterOutputs["tasks"]["all"]["data"];
  pagination: RouterOutputs["tasks"]["all"]["pagination"];
};

export function TasksTable({ dataSource, pagination }: TaskTableProps) {
  const columns: TableColumnDef<
    RouterOutputs["tasks"]["all"]["data"][number]
  >[] = [
    {
      dataIndex: "name",
      title: "Name",
    },
    {
      className: "flex gap-2",
      render: ({ record }) => {
        return (
          <>
            <Button primary icon={<EditIcon />} asChild>
              <Link href={`/${record.project.slug}/tasks/${record.id}`} />
            </Button>

            <DeleteTask id={record.id} />
          </>
        );
      },
    },
  ];

  return (
    <Table columns={columns} dataSource={dataSource} pagination={pagination} />
  );
}
