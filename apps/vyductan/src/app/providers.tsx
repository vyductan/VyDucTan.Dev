"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// import { AntdProvider } from '~/styles/AntdProvider'

type AppProviderProps = {
  children?: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
  // return (
  //   <AntdProvider>
  //     <SessionProvider>{children}</SessionProvider>
  //   </AntdProvider>
  // )
};
