import type { Config } from "tailwindcss"

import { tailwindConfig } from "@vyductan/theme-config"

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [tailwindConfig],
} satisfies Config
