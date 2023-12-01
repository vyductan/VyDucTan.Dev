import { ReactElement } from "react";

import { I18nProviderClient } from "~/locales/client";

export default function SubLayout({
  params: { lang },
  children,
}: {
  params: { lang: string };
  children: ReactElement;
}) {
  return <I18nProviderClient locale={lang}>{children}</I18nProviderClient>;
}
