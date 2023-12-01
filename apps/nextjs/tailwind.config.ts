import type { Config } from "tailwindcss";

import baseConfig from "@vyductan/theme-config";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../@vyductan/components/**/*.{ts,tsx}",
    // "../../@vyductan/components/"
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      backgroundImage: {
        "vert-light-gradient":
          "linear-gradient(180deg,hsla(0,0%,100%,0) 13.94%,#fff 58.73%)",
        "vert-dark-gradient":
          "linear-gradient(180deg,hsla(0,0%,100%,0) 13.94%,#000 58.73%)",
      },
    },
  },
} satisfies Config;
