"use client";

import { type ReactNode } from "react";

import { AppProvider } from "../providers";
import { PageHeader } from "./_components/PageHeader";
import { FeaturesSidebar } from "./_components/Sidebar";

type FeaturesLayoutProps = {
  children: ReactNode;
};
const FeaturesLayout = ({ children }: FeaturesLayoutProps) => {
  return (
    <AppProvider>
      <header className="h-16"></header>
      <main className="mt-6 max-w-screen-2xl lg:flex">
        <FeaturesSidebar>Sidebar</FeaturesSidebar>
        <div className="mx-4 grow">
          <PageHeader />
          <div className="my-6">{children}</div>
        </div>
      </main>
    </AppProvider>
  );
};

export default FeaturesLayout;
