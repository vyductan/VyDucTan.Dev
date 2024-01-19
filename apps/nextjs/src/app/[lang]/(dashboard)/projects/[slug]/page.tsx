"use client";

import { useParams } from "next/navigation";

import { Button } from "@vyductan/ui";
import { PageContainer } from "@vyductan/ui-pro";

import { api } from "~/trpc/react";
import { TasksModalForm } from "./components/TasksModalForm";
import { TasksTable } from "./components/TasksTable";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [project] = api.projects.bySlug.useSuspenseQuery({ slug });

  if (!project) return <div>Project not found</div>;

  return (
    <PageContainer
      header={{
        extra: (
          <TasksModalForm
            projectId={project.id}
            title="Add a new Task"
            trigger={<Button variant="primary">Add</Button>}
          />
        ),
      }}
    >
      <TasksTable projectId={project.id} dataSource={project.tasks} />
    </PageContainer>
  );
}
