import { Search } from "@acme/ui/input";
import { PageContainer } from "@acme/ui/pro/page-container";

import { api } from "~/trpc/react";
import { TasksTable } from "../projects/[slug]/components/TasksTable";
import { TodoRoute } from "./routeDef";

export default function TodoPage() {
  const searchParams = TodoRoute.useSearch();
  const { data } = api.tasks.all.useQuery(
    { ...searchParams },
    {
      initialData: {
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pageSize: 0,
        },
      },
    },
  );

  return (
    <PageContainer>
      <Search placeholder="Search tasks..." />
      <TasksTable />
    </PageContainer>
  );
}
