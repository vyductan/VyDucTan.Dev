"use client";

import Link from "next/link";

import type { RouterOutputs } from "@acme/api";
import type { TableColumnDef } from "@acme/ui/table";
import { Table } from "@acme/ui/table";

type Props = {
  dataSource: RouterOutputs["projects"]["all"]["data"];
  actionColumn: TableColumnDef<
    RouterOutputs["projects"]["all"]["data"][number]
  >;
};
export const ProjectsTable = ({ dataSource, actionColumn }: Props) => {
  return <Table columns={[...columns, actionColumn]} dataSource={dataSource} />;
};

const columns: TableColumnDef<
  RouterOutputs["projects"]["all"]["data"][number]
>[] = [
  {
    dataIndex: "name",
    title: "Name",
    render: ({ record, value }) => {
      return <Link href={`projects/${record.slug}`}>{value}</Link>;
    },
  },
];
