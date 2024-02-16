import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@vyductan/tailwind-config/web";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "../../@vyductan/ui/**/*.{ts,tsx}",
    "../../@vyductan/ui-pro/**/*.{ts,tsx}",
    "../../packages/tts/**/*.{ts,tsx}",
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
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
    },
  },
} satisfies Config;
