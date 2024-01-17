"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { TailwindIndicator, Toaster } from "@vyductan/ui";
import { ThemeToggle } from "@vyductan/ui-pro";

import { TRPCReactProvider } from "~/trpc/react";

// import { AntdProvider } from '~/styles/AntdProvider'

type AppProviderProps = {
  children: ReactNode;
  headersPromise: Promise<Headers>;
};

export const AppProvider = ({ children, headersPromise }: AppProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TRPCReactProvider headersPromise={headersPromise}>
        {children}
      </TRPCReactProvider>
      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
      <TailwindIndicator />
      <Toaster />
    </ThemeProvider>
  );
};
