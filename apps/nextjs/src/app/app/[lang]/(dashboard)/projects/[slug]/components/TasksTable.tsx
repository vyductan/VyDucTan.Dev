"use client";

import Link from "next/link";

import type { Task } from "@acme/api/tasks/types";
import type { TableColumnDef } from "@acme/ui/table";
import { Button } from "@acme/ui/button";
import { EditIcon } from "@acme/ui/icons";
import { Table } from "@acme/ui/table";

import { api } from "~/trpc/react";
import { DeleteTask } from "./DeleteTask";

export function TasksTable({
  projectId,
  projectSlug,
  query,
  currentPage,
}: {
  projectId: string;
  projectSlug: string;
  query: string;
  currentPage: number;
}) {
  const { data } = api.tasks.all.useQuery(
    { projectId, query, page: currentPage },
    {
      initialData: {
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pageSize: 0,
        },
      },
    },
  );
  const columns: TableColumnDef<Task>[] = [
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
              <Link href={`/${projectSlug}/tasks/${record.id}`} />
            </Button>

            <DeleteTask id={record.id} />
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data.data}
      pagination={data.pagination}
    />
  );
}
