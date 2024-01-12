"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import type { ProjectResponse } from "@vyductan/api/types";
import { Button } from "@vyductan/ui";
import { PageContainer } from "@vyductan/ui-pro";

import { api } from "~/trpc/react";
import ProjectModalForm from "./components/ProjectsForm";
import { ProjectsTable } from "./components/ProjectsTable";

export default function ProjectsPage() {
  const [projects] = api.projects.all.useSuspenseQuery();
  const [currentRow, setCurrentRow] = useState<ProjectResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <PageContainer
      header={{
        extra: (
          <>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Add
            </Button>
          </>
        ),
      }}
    >
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>Open</Dialog.Trigger>
        <Dialog.Trigger>XXX</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <button onClick={() => setOpen(false)}>CLose</button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <ProjectsTable
        dataSource={projects}
        actionColumn={{
          render: (_, record) => {
            return (
              <>
                <Button
                  onClick={() => {
                    setCurrentRow(record);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
              </>
            );
          },
        }}
      />
      <ProjectModalForm
        id={currentRow?.id}
        isOpen={isModalOpen}
        onCancel={() => {
          setCurrentRow(undefined);
          setIsModalOpen(false);
        }}
        onOpenChange={setIsModalOpen}
      />
    </PageContainer>
  );
}
