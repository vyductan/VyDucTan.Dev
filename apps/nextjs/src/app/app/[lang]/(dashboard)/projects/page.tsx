"use client";

import { useState } from "react";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import { PageContainer } from "@acme/ui/pro/page-container";

import { api } from "~/trpc/react";
import ProjectModalForm from "./components/ProjectsForm";
import { ProjectsTable } from "./components/ProjectsTable";
import { ProjectsRoute } from "./routeDef";

export default function ProjectsPage() {
  const searchParams = ProjectsRoute.useSearch();
  const listQuery = api.projects.all.useQuery(searchParams);
  const [currentRow, setCurrentRow] =
    useState<RouterOutputs["projects"]["all"]["data"][number]>();
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
      {listQuery.data && (
        <ProjectsTable
          dataSource={listQuery.data.data}
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
      )}
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
