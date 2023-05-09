import { type Config } from "tailwindcss";
import { screens } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      libre: ["librebaskerville", "serif"],
    },
    screens: {
      xs: "475px",
      ...screens,
    },
    extend: {
      colors: {
        primary: "#f40612",
      },
      transitionProperty: {
        border: "border",
      },
    },
  },
} satisfies Config;
