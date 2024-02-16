import { type Config } from "tailwindcss";
import defaultColors from "tailwindcss/colors";
import {
  borderRadius,
  fontSize,
  screens,
  spacing,
} from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

import THEME_TOKEN from "./token";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./@vyductan/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      libre: ["librebaskerville", "serif"],
    },
    screens: {
      xs: "475px",
      ...screens,
    },
    extend: {
      backgroundColor: {},
      borderRadius: {
        default: borderRadius.md,
      },
      borderColor: {
        default: THEME_TOKEN.colorBorder,
        secondary: THEME_TOKEN.colorBorderSecondary,
      },
      colors: {
        primary: THEME_TOKEN.colorPrimary,
        "primary-border": THEME_TOKEN.colorPrimaryBorder,
        "primary-hover": THEME_TOKEN.colorPrimaryHover,
        brand: {
          "50": "#fffaec",
          "100": "#fff4d3",
          "200": "#ffe6a5",
          "300": "#ffd26d",
          "400": "#ffb332",
          "500": "#ff9a0a",
          "600": "#ff8200",
          "700": "#cc5f02",
          "800": "#a1490b",
          "900": "#823e0c",
          "950": "#461d04",
        },
        error: defaultColors.red["500"],
      },
      textColor: {
        "c-default": THEME_TOKEN.colorText,
        "c-disabled": THEME_TOKEN.colorTextDisabled,
      },
      fontSize: {
        md: fontSize.base,
        base: fontSize.sm,
      },
      maxWidth: ({ theme }) => ({
        "2/3": theme("width.2/3") as string,
      }),
      // maxWidth: {
      //   // '1/2': width['1/2'],
      //   // '2/3': width.,
      // },

      height: {
        xxs: spacing[6],
        xs: spacing[7],
        sm: spacing[8],
        md: spacing[9],
        lg: spacing[11],
        xl: spacing[12],
      },
      // height: ({theme}) => ({
      //   sm: theme("height.6"),
      //   base: theme("height.8"),
      //   lg: spacing['10'],
      // }),
      spacing: {
        md: "24px",
      },
      transitionProperty: {
        border: "border",
        height: "height",
        spacing: "margin, padding",
      },
      animation: {
        "spinner-ease-spin": "spinner-spin 0.8s ease infinite",
        "spinner-linear-spin": "spinner-spin 0.8s linear infinite",
      },
      keyframes: {
        "spinner-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require("@tailwindcss/typography"),
    plugin(({ theme, addUtilities }) => {
      const neonUtilities: any = {};
      const colors = theme("colors");

      // loop through the colors
      for (const color in colors) {
        // Check if color is an object as some colors in
        // Tailwind are objects and some are strings
        if (typeof colors[color] === "object") {
          // we opt in to use 2 colors
          const color1 = colors[color]["500"];
          const color2 = colors[color]["700"];

          // Here we build the actual class name
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 5px ${color1}, 0 0 20px ${color2}`,
          };
        }
      }
      // this adds the utility classes to Tailwind
      addUtilities(neonUtilities);
    }),
  ],
} satisfies Config;
