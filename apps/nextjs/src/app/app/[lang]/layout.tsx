import type { ReactElement } from "react";

import { ConfigProvider } from "@acme/antd/config-provider";

import { I18nProviderClient } from "~/locales/client";

export default function SubLayout({
  params: { lang },
  children,
}: {
  params: { lang: string };
  children: ReactElement;
}) {
  return (
    <I18nProviderClient locale={lang}>
      <ConfigProvider>{children}</ConfigProvider>
    </I18nProviderClient>
  );
}
