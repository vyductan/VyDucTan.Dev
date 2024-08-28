"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import type { RouterOutputs } from "@acme/api";
import type { TableColumnDef } from "@acme/ui/table";
import { AlertModal } from "@acme/ui/alert-modal";
import { Button } from "@acme/ui/button";
import { DeleteIcon, EditIcon } from "@acme/ui/icons";
import { InputSearch } from "@acme/ui/input";
import { PageContainer } from "@acme/ui/pro/page-container";
import { Table } from "@acme/ui/table";
import { message } from "@acme/ui/toast";

import { api } from "~/trpc/react";
import { TasksModalForm } from "./components/TasksModalForm";
import { TasksTable } from "./components/TasksTable";
import { TasksTableSkeleton } from "./components/TasksTableSkeleton";

export default function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams?: {
    query?: string;
    page?: number;
  };
}) {
  const slug = params.slug;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const { data: project, refetch } = api.projects.bySlug.useQuery(
    {
      slug,
    },
    {
      select: (data) => data,
      enabled: false,
    },
  );

  // const utils = api.useUtils();
  // const addTask = api.tasks.create.useMutation({
  //   onSuccess: async () => {
  //     setFormModalOpen(false);
  //     await utils.projects.bySlug.invalidate();
  //   },
  //   onError: (error) => {
  //     message.error(error.message);
  //   },
  // });
  // const updateTask = api.tasks.update.useMutation({
  //   onSuccess: async () => {
  //     await utils.projects.all.invalidate();
  //   },
  //   onError: (error) => {
  //     message.error(error.message);
  //   },
  // });
  // const deleteWord = api.english.delete.useMutation({
  //   onSuccess: async () => {
  //     message.success("Deleted");
  //     setCurrentRow(undefined);
  //     setDeleteModalOpen(false);
  //     await utils.english.all.invalidate();
  //   },
  //   onError: (error) => {
  //     message.error(error.message);
  //   },
  // });

  useEffect(() => {
    void refetch();
  }, [refetch]);
  if (!project) return <div>Project not found</div>;

  return (
    <PageContainer
      header={{
        title: "Tasks",
        // extra: (
        //   <Button primary onClick={() => setFormModalOpen(true)}>
        //     Add
        //   </Button>
        // ),
      }}
    >
      <InputSearch placeholder="Search tasks..." />
      {/* <CreateInvoice /> */}
      {/* <Table columns={columns} dataSource={project.tasks} /> */}
      <TasksTable
        projectId={project.id}
        projectSlug={slug}
        query={query}
        currentPage={currentPage}
      />
      {/* <TasksModalForm */}
      {/*   title={currentRow ? "Edit task" : "Add task"} */}
      {/*   open={formModalOpen} */}
      {/*   id={currentRow?.id} */}
      {/*   projectId={project.id} */}
      {/*   trigger={<Button>Edit</Button>} */}
      {/*   searchingTasks={[]} */}
      {/*   okLoading={addTask.isPending || updateTask.isPending} */}
      {/*   onOpenChange={setFormModalOpen} */}
      {/*   onCancel={() => { */}
      {/*     setCurrentRow(undefined); */}
      {/*     setFormModalOpen(false); */}
      {/*   }} */}
      {/*   onSubmit={async (values) => { */}
      {/*     !currentRow */}
      {/*       ? addTask.mutate(values) */}
      {/*       : updateTask.mutate({ */}
      {/*           ...values, */}
      {/*           id: currentRow.id, */}
      {/*         }); */}
      {/*     await utils.projects.bySlug.invalidate(); */}
      {/*   }} */}
      {/* /> */}
      {/* <AlertModal */}
      {/*   open={deleteModalOpen} */}
      {/*   onOpenChange={setDeleteModalOpen} */}
      {/*   title="Confirm delete" */}
      {/*   description="Are you sure you want to delete this word?" */}
      {/*   okLoading={deleteWord.isPending} */}
      {/*   onConfirm={() => { */}
      {/*     currentRow && deleteWord.mutate(currentRow?.id); */}
      {/*   }} */}
      {/* /> */}
    </PageContainer>
  );
}
