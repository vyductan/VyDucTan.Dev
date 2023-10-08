"use client";

import { useParams, usePathname } from "next/navigation";
import { ProjectTask } from "@prisma/client";
import { ColumnsType, Link, Table } from "@vyductan/react";
import { useServerAction } from "@vyductan/react/serverAction";

import { getProjectByIdAction } from "../action";

// import { AddProjectTaskModal } from './components/AddTaskModal'

export default function ProjectDetailPage() {
  const pathname = usePathname();
  const params = useParams();
  console.log("params", params);
  const { data, loading } = useServerAction(getProjectByIdAction, {
    // manual: true,
    // input:
    //   params && typeof params['id'] === 'string'
    //     ? { id: params['id'] }
    //     : undefined,
    input: { id: "df9a34ee-a96f-4e69-92eb-aa306ac31b68" },
  });

  const columns: ColumnsType<ProjectTask> = [
    {
      dataIndex: "name",
      title: "Name",
      render: ({ id, name }) => <Link href={`${pathname}/${id}`}>{name}</Link>,
    },
  ];
  // console.log('data', data)
  return (
    <div>
      {/* <div>{data?.name}</div> */}
      {/* <div>{data?.object}</div> */}
      {/* <AddProjectTaskModal /> */}
      {/* <Table */}
      {/*   columns={columns} */}
      {/*   dataSource={data?.tasks} */}
      {/*   loading={loading} */}
      {/* /> */}
    </div>
  );
}
// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())
//
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
