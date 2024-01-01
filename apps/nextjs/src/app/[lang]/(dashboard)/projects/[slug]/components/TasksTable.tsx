"use client";

import type { ProjectTasksResponse } from "@vyductan/api/types";
import type { TableColumnDef } from "@vyductan/ui";
import { Table } from "@vyductan/ui";

type TasksTableProps = {
  dataSource: ProjectTasksResponse[];
};
export const TasksTable = ({ dataSource }: TasksTableProps) => {
  return <Table columns={columns} dataSource={dataSource} />;
};

const columns: TableColumnDef<ProjectTasksResponse>[] = [
  {
    dataIndex: "name",
    title: "Name",
  },
];
