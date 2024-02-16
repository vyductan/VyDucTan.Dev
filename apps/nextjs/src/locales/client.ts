"use client";

import { createI18nClient } from "next-international/client";

const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  en: () => import("./en"),
  vi: () => import("./vi"),
});

const useTranslation = () => {
  return {
    t: useI18n(),
  };
};

export { useTranslation, useScopedI18n, I18nProviderClient };
