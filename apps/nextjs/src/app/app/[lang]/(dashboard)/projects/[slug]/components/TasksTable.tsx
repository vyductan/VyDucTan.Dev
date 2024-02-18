"use client";

import type { ProjectTasksResponse } from "@vyductan/api/types";
import type { TableColumnDef } from "@vyductan/ui";
import { Button, Table } from "@vyductan/ui";

import { TasksModalForm } from "./TasksModalForm";

type TasksTableProps = {
  projectId: string;
  dataSource: ProjectTasksResponse[];
};
export const TasksTable = ({ projectId, dataSource }: TasksTableProps) => {
  const actionColumn: TableColumnDef<ProjectTasksResponse> = {
    render: ({ record }) => (
      <TasksModalForm
        id={record.id}
        projectId={projectId}
        title="Edit Task"
        trigger={<Button>Edit</Button>}
      />
    ),
  };
  return <Table columns={[...columns, actionColumn]} dataSource={dataSource} />;
};

const columns: TableColumnDef<ProjectTasksResponse>[] = [
  {
    dataIndex: "name",
    title: "Name",
  },
];
