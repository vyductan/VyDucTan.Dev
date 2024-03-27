import { tableLocale_vi } from "@vyductan/ui/table";

export default {
  hello: {
    world: "Hello {param}!",
    nested: {
      translations: "Translations",
    },
  },
  Speak: "Phát âm",
  ...tableLocale_vi,
} as const;
