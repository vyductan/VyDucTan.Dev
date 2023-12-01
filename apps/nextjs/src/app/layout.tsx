import "~/styles/globals.css";

import { headers } from "next/headers";
import { GeistSans } from "geist/font/sans";

import { AppProvider } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // https://github.com/pacocoursey/next-themes/issues/224#issuecomment-1755634035
    // https://www.npmjs.com/package/geist?activeTab=readme#with-tailwind-css
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <AppProvider headers={headers()}>{children}</AppProvider>
      </body>
    </html>
  );
}
