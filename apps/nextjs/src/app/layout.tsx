import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { clsm } from "@acme/ui";
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";

import { TRPCReactProvider } from "~/trpc/react";

import "../app/globals.css";

import { TailwindIndicator } from "@acme/ui/pro/tailwind-indicator";
import { Toaster } from "@acme/ui/toast";

import { env } from "~/env";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://vyductan.com"
      : `http://localhost:${process.env.PORT ?? 3000}`,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <Providers />
            {children}
          </TRPCReactProvider>
          <div className="fixed bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
