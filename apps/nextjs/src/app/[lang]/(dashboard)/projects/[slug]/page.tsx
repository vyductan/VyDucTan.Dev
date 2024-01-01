"use client";

import { useParams } from "next/navigation";

import { PageContainer } from "@vyductan/ui-pro";

import { api } from "~/trpc/react";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TasksGantt } from "./components/TasksGantt";
import { TasksTable } from "./components/TasksTable";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [project] = api.projects.bySlug.useSuspenseQuery({ slug });

  if (!project) return <div>Project not found</div>;
  return (
    <PageContainer
      header={{
        extra: <CreateTaskForm projectId={project.id} />,
      }}
    >
      <TasksTable dataSource={project.tasks} />
      <TasksGantt />
    </PageContainer>
  );
}
