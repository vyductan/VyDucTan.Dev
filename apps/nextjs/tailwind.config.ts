import type { Config } from "tailwindcss";

import baseConfig from "@vyductan/tailwind-config";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../@vyductan/components/**/*.{ts,tsx}",
    // "../../@vyductan/components/"
  ],
  presets: [baseConfig],
} satisfies Config;
