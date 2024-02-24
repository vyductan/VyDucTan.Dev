import type { ReactNode } from "react";

import { DashboardHeader } from "./_components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
