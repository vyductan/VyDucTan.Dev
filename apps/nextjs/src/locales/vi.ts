import { tableLocale_vi } from "@acme/ui/table";

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
