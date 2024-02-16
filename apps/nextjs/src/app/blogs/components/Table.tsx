"use client";

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import type { ColumnDef } from "@vyductan/ui";
import { Table } from "@vyductan/ui";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

type BlogsTableProps = {
  dataSource: PageObjectResponse[];
};
export const BlogsTable = ({ dataSource }: BlogsTableProps) => {
  const columns: ColumnDef<Blog>[] = [
    {
      render: (r) => {
        r.Title.title;
        // const props = r.properties;
        // const title = props["Name"]
        //         if(title?.type === "title"){
        // title
        //         }
        //         if( "Name" in props){
        //           props
        //           return "123"
        //         }
        return "";
      },
      title: "Title",
    },
  ];
  return (
    <div>
      BlogsTable
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
