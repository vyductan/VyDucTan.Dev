"use client";

import Link from "next/link";

import type { ProjectResponse } from "@vyductan/api/types";
import type { TableColumnDef } from "@vyductan/ui";
import { Table } from "@vyductan/ui";

type Props = {
  dataSource: ProjectResponse[];
  actionColumn: TableColumnDef<ProjectResponse>;
};
export const ProjectsTable = ({ dataSource, actionColumn }: Props) => {
  return <Table columns={[...columns, actionColumn]} dataSource={dataSource} />;
};

const columns: TableColumnDef<ProjectResponse>[] = [
  {
    dataIndex: "name",
    title: "Name",
    render: (value, record) => {
      return <Link href={`projects/${record.slug}`}>{value}</Link>;
    },
  },
];
