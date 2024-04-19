"use client";

import { useState } from "react";

import type { ProjectResponse } from "@acme/api/types";
import { Button } from "@acme/ui/button";
import { PageContainer } from "@acme/ui/pro";

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
