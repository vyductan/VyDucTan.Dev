import type { CxOptions } from "class-variance-authority";
import { cx } from "class-variance-authority";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ["xs", "sm", "md", "lg", "xl"],
    },
  },
});
const clsm = (...inputs: CxOptions) => {
  return customTwMerge(cx(inputs));
};

export { clsm };
