const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      //sans: ["opensans-regular", "sans-serif"],
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
  variants: {
    extend: {},
  },
};
