import { PageContainer } from "@vyductan/ui-pro";

import CreateProjectForm from "./components/AddProjectForm";
import { ProjectsTable } from "./components/ProjectsTable";

export default function ProjectsPage() {
  return (
    <PageContainer
      header={{
        extra: <CreateProjectForm />,
      }}
    >
      <ProjectsTable />
    </PageContainer>
  );
}
