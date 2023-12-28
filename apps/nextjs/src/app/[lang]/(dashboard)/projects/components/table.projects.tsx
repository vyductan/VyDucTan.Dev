import type { ProjectResponse } from "@vyductan/api";
import type { TableColumnDef } from "@vyductan/components";

import { Table } from "@vyductan/components";

import { api } from "~/trpc/react";

export const WordTable = () => {
  const [projects] = api.projects.all.useSuspenseQuery();

  return <Table columns={columns} data={projects} />;
};

const columns: TableColumnDef<ProjectResponse>[] = [
  {
    dataIndex: "name",
    title: "Name",
  },
];
