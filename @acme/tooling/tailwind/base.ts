import type { Config } from "tailwindcss";
import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from "tailwindcss/types/config";
import { addDynamicIconSelectors } from "@iconify/tailwind";
import { fontSize } from "tailwindcss/defaultTheme";

const baseColors = {
  primary: {
    DEFAULT: "hsl(var(--primary-600))",
    hover: "hsl(var(--primary-hover))",
    foreground: "hsl(var(--primary-foreground))",
    100: "hsl(var(--primary-100))",
    200: "hsl(var(--primary-200))",
    300: "hsl(var(--primary-300))",
    400: "hsl(var(--primary-400))",
    500: "hsl(var(--primary-500))",
    600: "hsl(var(--primary-600))",
    700: "hsl(var(--primary-700))",
    800: "hsl(var(--primary-800))",
    900: "hsl(var(--primary-900))",
    950: "hsl(var(--primary-950))",
  },
  gray: {
    100: "oklch(var(--ds-gray-100) / <alpha-value>)",
    200: "oklch(var(--ds-gray-200) / <alpha-value>)",
    300: "oklch(var(--ds-gray-300) / <alpha-value>)",
    400: "oklch(var(--ds-gray-400) / <alpha-value>)",
    500: "oklch(var(--ds-gray-500) / <alpha-value>)",
    600: "oklch(var(--ds-gray-600) / <alpha-value>)",
    700: "oklch(var(--ds-gray-700) / <alpha-value>)",
    800: "oklch(var(--ds-gray-800) / <alpha-value>)",
    900: "oklch(var(--ds-gray-900) / <alpha-value>)",
    950: "oklch(var(--ds-gray-950) / <alpha-value>)",
  },
  blue: {
    100: "oklch(var(--ds-blue-100) / <alpha-value>)",
    200: "oklch(var(--ds-blue-200) / <alpha-value>)",
    300: "oklch(var(--ds-blue-300) / <alpha-value>)",
    400: "oklch(var(--ds-blue-400) / <alpha-value>)",
    500: "oklch(var(--ds-blue-500) / <alpha-value>)",
    600: "oklch(var(--ds-blue-600) / <alpha-value>)",
    700: "oklch(var(--ds-blue-700) / <alpha-value>)",
    800: "oklch(var(--ds-blue-800) / <alpha-value>)",
    900: "oklch(var(--ds-blue-900) / <alpha-value>)",
    950: "oklch(var(--ds-blue-950) / <alpha-value>)",
  },
  green: {
    100: "oklch(var(--ds-green-100) / <alpha-value>)",
    200: "oklch(var(--ds-green-200) / <alpha-value>)",
    300: "oklch(var(--ds-green-300) / <alpha-value>)",
    400: "oklch(var(--ds-green-400) / <alpha-value>)",
    500: "oklch(var(--ds-green-500) / <alpha-value>)",
    600: "oklch(var(--ds-green-600) / <alpha-value>)",
    700: "oklch(var(--ds-green-700) / <alpha-value>)",
    800: "oklch(var(--ds-green-800) / <alpha-value>)",
    900: "oklch(var(--ds-green-900) / <alpha-value>)",
    950: "oklch(var(--ds-green-950) / <alpha-value>)",
  },
  red: {
    100: "oklch(var(--ds-red-100) / <alpha-value>)",
    200: "oklch(var(--ds-red-200) / <alpha-value>)",
    300: "oklch(var(--ds-red-300) / <alpha-value>)",
    400: "oklch(var(--ds-red-400) / <alpha-value>)",
    500: "oklch(var(--ds-red-500) / <alpha-value>)",
    600: "oklch(var(--ds-red-600) / <alpha-value>)",
    700: "oklch(var(--ds-red-700) / <alpha-value>)",
    800: "oklch(var(--ds-red-800) / <alpha-value>)",
    900: "oklch(var(--ds-red-900) / <alpha-value>)",
    950: "oklch(var(--ds-red-950) / <alpha-value>)",
  },
  teal: {
    100: "oklch(var(--ds-teal-100) / <alpha-value>)",
    200: "oklch(var(--ds-teal-200) / <alpha-value>)",
    300: "oklch(var(--ds-teal-300) / <alpha-value>)",
    400: "oklch(var(--ds-teal-400) / <alpha-value>)",
    500: "oklch(var(--ds-teal-500) / <alpha-value>)",
    600: "oklch(var(--ds-teal-600) / <alpha-value>)",
    700: "oklch(var(--ds-teal-700) / <alpha-value>)",
    800: "oklch(var(--ds-teal-800) / <alpha-value>)",
    900: "oklch(var(--ds-teal-900) / <alpha-value>)",
    950: "oklch(var(--ds-teal-950) / <alpha-value>)",
  },
} satisfies ResolvableTo<RecursiveKeyValuePair>;

export default {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...baseColors,
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: {
            DEFAULT: baseColors.gray[900],
          },
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          hover: "hsl(var(--background-hover))",
          disabled: "hsl(var(--background-disabled))",
          muted: {
            DEFAULT: baseColors.gray[100],
          },
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: baseColors.blue[600],
          hover: baseColors.blue[700],
          foreground: "hsl(var(--accent-foreground))",
          muted: {
            DEFAULT: baseColors.blue[100],
          },
        },
        danger: {
          DEFAULT: baseColors.red[800],
          hover: baseColors.red[900],
          muted: {
            DEFAULT: baseColors.red[100],
          },
        },
        success: {
          DEFAULT: baseColors.green[600],
          hover: baseColors.green[700],
          muted: {
            DEFAULT: baseColors.green[100],
          },
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: {
          DEFAULT: "var(--border)",
          hover: "var(--border-hover)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        input: "hsl(var(--input))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        ring: "hsl(var(--ring))",
      },
      /* End Colors */

      fontSize: {
        md: fontSize.base,
      },
      width: {
        "screen-md": "1024px",
      },
      /**
       * Colors
       */
      textColor: {
        description: "hsl(var(--text-description))",
      },
      backgroundColor: {
        warning: "hsl(var(--warning-bg))",
      },
      borderColor: {
        warning: "hsl(var(--warning-border))",
      },
    },
  },
} satisfies Config;
