"use client";

import Link from "next/link";
import axios from "axios";

import { db } from "@acme/api/db";
import { Button } from "@acme/ui/button";
import { DeleteIcon, EditIcon } from "@acme/ui/icons";
import { Table } from "@acme/ui/table";

import { api } from "~/trpc/react";

export default function TestPage() {
  // const { data } = api.tasks.all.useQuery({
  //   projectId: "0B5u_ldwi1V0nGU0ub10f",
  //   query: "",
  //   page: 1,
  // });
  // const a = api.tasks.test2.useQuery();

  // const a = api.tasks.test.useQuery();
  const { data } = api.tasks.all.useQuery({ page: 1 });
  // const { data } = api.tasks.test.useQuery();
  return (
    <>
      <div className="flex w-40 flex-col">
        {/* <Table */}
        {/*   columns={[ */}
        {/*     { */}
        {/*       dataIndex: "name", */}
        {/*       title: "Name", */}
        {/*     }, */}
        {/*   ]} */}
        {/*   dataSource={data?.data ?? []} */}
        {/*   // pagination={data.pagination} */}
        {/* /> */}
        <Button icon={<EditIcon />}>X</Button>
        <Button primary variant="outline" icon={<EditIcon />}>
          X
        </Button>
        <Button danger variant="outline" icon={<DeleteIcon />}>
          X
        </Button>
        <Button variant="outline" icon={<DeleteIcon />} asChild>
          <Link href={`/`} />
        </Button>
      </div>
    </>
  );
}
