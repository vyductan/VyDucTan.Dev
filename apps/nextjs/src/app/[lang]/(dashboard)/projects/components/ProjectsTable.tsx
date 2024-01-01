"use client";

import type { ProjectResponse } from "@vyductan/api/types";
import type { TableColumnDef } from "@vyductan/ui";
import { Table } from "@vyductan/ui";

import { api } from "~/trpc/react";

export const ProjectsTable = () => {
  const [projects] = api.projects.all.useSuspenseQuery();

  return <Table columns={columns} dataSource={projects} />;
};

const columns: TableColumnDef<ProjectResponse>[] = [
  {
    dataIndex: "name",
    title: "Name",
  },
];
