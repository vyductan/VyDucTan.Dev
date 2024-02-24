import type { Config } from "tailwindcss";
import { fontSize } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        sm: `calc(var(--radius) - 2px)`,
        md: `var(--radius)`,
        lg: `calc(var(--radius) + 2px)`,
      },
      colors: ({ colors }) => ({
        error: colors.red[300],
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        link: "hsl(var(--link))",
        primary: {
          DEFAULT: "hsl(var(--primary-600))",
          hover: "hsl(var(--primary-500))",
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      }),
      // textColor: ({ theme }) => ({
      //   // color: THEME_TOKEN.colorText,
      //   // foreground: theme("colors.gray.800"),
      //   // warning: THEME_TOKEN.colorWarningText,
      // }),

      fontSize: {
        md: fontSize.base,
        base: fontSize.sm,
      },
      width: {
        "screen-md": "1024px",
      },
      /**
       * Colors
       */
      textColor: {
        placeholder: "hsl(var(--placeholder))",
        description: "hsl(var(--text-description))",
      },
      backgroundColor: {
        warning: "hsl(var(--warning-bg))",
      },
      borderColor: {
        "error-hover": "hsl(var(--border-error-hover))",
        warning: "hsl(var(--warning-border))",
      },
    },
  },
} satisfies Config;
