import { tableLocale_en } from "@acme/ui/table";

export default {
  hello: {
    world: "Hello {param}!",
    nested: {
      translations: "Translations",
    },
  },
  no: {
    data: "No Data",
  },
  today: "Today",
  Speak: "Speak",
  ...tableLocale_en,
} as const;
