import { PageContainer } from "@vyductan/components-pro";

import CreateProjectForm from "./components/create.project";

export default function TodoPage() {
  return (
    <PageContainer
      header={{
        extra: <CreateProjectForm />,
      }}
    >
      <></>
      {/* <WordTable /> */}
    </PageContainer>
  );
}
