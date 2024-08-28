"use client";

import { Button } from "@acme/ui/antd/button";

import { WordTable } from "./_components/WordTable";
import { WordsRoute } from "./routeDef";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = WordsRoute.useNavigate();
  return (
    <>
      <Button
        primary
        onClick={() =>
          navigate({ to: "/english/words/new", search: (prev) => prev })
        }
      >
        Add
      </Button>

      <WordTable />
      {children}
    </>
  );
}
