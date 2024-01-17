import type { ReactNode } from "react";

import { Header } from "./_components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
