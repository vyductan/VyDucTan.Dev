"use client";

import { useState } from "react";

import type { ProjectResponse } from "@vyductan/api/types";
import { PageContainer } from "@vyductan/ui-pro";
import { Button } from "@vyductan/ui/button";

import { api } from "~/trpc/react";
import ProjectModalForm from "./components/ProjectsForm";
import { ProjectsTable } from "./components/ProjectsTable";

export default function ProjectsPage() {
  const { data: projects } = api.projects.all.useQuery(undefined, {
    initialData: [],
  });
  const [currentRow, setCurrentRow] = useState<ProjectResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer
      header={{
        extra: (
          <>
            <Button primary onClick={() => setIsModalOpen(true)}>
              Add
            </Button>
          </>
        ),
      }}
    >
      <ProjectsTable
        dataSource={projects}
        actionColumn={{
          render: ({ record }) => {
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
