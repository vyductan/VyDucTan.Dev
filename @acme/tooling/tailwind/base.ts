import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { fontSize } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        link: "hsl(var(--link))",
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
        "ds-gray": {
          100: "hsl(var(--ds-gray-100))",
          200: "hsl(var(--ds-gray-200))",
          300: "hsl(var(--ds-gray-300))",
          400: "hsl(var(--ds-gray-400))",
          500: "hsl(var(--ds-gray-500))",
          600: "hsl(var(--ds-gray-600))",
          700: "hsl(var(--ds-gray-700))",
          800: "hsl(var(--ds-gray-800))",
          900: "hsl(var(--ds-gray-900))",
          1000: "hsl(var(--ds-gray-1000))",
        },
        foreground: "hsl(var(--foreground))",
        background: {
          DEFAULT: "hsl(var(--background))",
          hover: "hsl(var(--background-hover))",
          disabled: "hsl(var(--background-disabled))",
          200: "hsl(var(--background-200))",
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
          DEFAULT: "var(--ds-blue-600)",
          hover: "var(--ds-blue-700)",
          foreground: "hsl(var(--accent-foreground))",
          muted: {
            DEFAULT: "var(--ds-blue-100)",
          },
        },
        danger: {
          DEFAULT: "var(--ds-red-800)",
          hover: "var(--ds-red-900)",
          muted: {
            DEFAULT: "var(--ds-red-100)",
          },
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          active: "hsl(var(--error-active))",
          hover: "hsl(var(--error-hover))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
        },
        border: {
          DEFAULT: "var(--border)",
          hover: "var(--border-hover)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        placeholder: "hsl(var(--placeholder))",
      },
      // textColor: ({ theme }) => ({
      //   // color: THEME_TOKEN.colorText,
      //   // foreground: theme("colors.gray.800"),
      //   // warning: THEME_TOKEN.colorWarningText,
      // }),

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
