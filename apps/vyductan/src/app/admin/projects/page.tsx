"use client";

import { usePathname } from "next/navigation";
import { Project } from "@prisma/client";
import { ColumnsType, Link, Table } from "@vyductan/react";
import { useServerAction } from "@vyductan/react/serverAction";

import { getProjectsAction } from "./action";
import { AddProjectModal } from "./AddModal";

export default function ProjectsPage() {
  const pathname = usePathname();
  const { data, loading } = useServerAction(getProjectsAction);

  console.log("data", data);

  const columns: ColumnsType<Project> = [
    {
      dataIndex: "name",
      title: "Name",
      render: ({ id, name }) => <Link href={`${pathname}/${id}`}>{name}</Link>,
    },
  ];
  return (
    <div>
      <AddProjectModal />
      {/* <Table */}
      {/*   columns={columns} */}
      {/*   dataSource={data} */}
      {/*   loading={loading} */}
      {/* /> */}
    </div>
  );
}
