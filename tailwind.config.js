const { screens } = require("tailwindcss/defaultTheme");
const { presetPalettes } = require("@ant-design/colors");

const colorMap = {};
Object.keys(presetPalettes).map((x) => {
  const temp = {};
  presetPalettes[x].map((y, i) => {
    temp[i] = y;
  });
  colorMap[x] = temp;
});
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
      primary: colorMap.blue["5"],
      secondary: colorMap.blue["4"],
      colors: {
        ...colorMap,
      },
      transitionProperty: {
        border: "border",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
