import "~/app/globals.css";

import type { Metadata, Viewport } from "next";
import { cache } from "react";
import { headers } from "next/headers";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { clsm } from "@vyductan/utils";

import { env } from "~/env";
import { AppProvider } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://vyductan.com"
      : "http://localhost:3000",
  ),
  title: "VyDucTan",
  description: "Simple monorepo with shared backend for web & mobile apps",
  // openGraph: {
  //   title: "Create T3 Turbo",
  //   description: "Simple monorepo with shared backend for web & mobile apps",
  //   url: "https://create-t3-turbo.vercel.app",
  //   siteName: "Create T3 Turbo",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@jullerino",
  //   creator: "@jullerino",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const getHeaders = cache(() => Promise.resolve(headers()));

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    // https://github.com/pacocoursey/next-themes/issues/224#issuecomment-1755634035
    // https://www.npmjs.com/package/geist?activeTab=readme#with-tailwind-css
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsm(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.className,
          GeistMono.className,
        )}
      >
        <AppProvider headersPromise={getHeaders()}>{children}</AppProvider>
      </body>
    </html>
  );
}
