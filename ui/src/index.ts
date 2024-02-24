import type { CxOptions } from "class-variance-authority";
import { cx } from "class-variance-authority";
import { extendTailwindMerge } from "tailwind-merge";

export { default as Alert } from "./alert";
export * from "./alert-modal";
export * from "./autocomplete";
export * from "./avatar";
export * from "./button";
export * from "./calendar";
export * from "./code-block";
export * from "./date-picker";
export * from "./divider";
export * from "./dropdown";
export { default as Card } from "./card";
export * from "./float-button";
export * from "./form";
// export { default as Drawer } from "./drawer/index.ts_";
export * from "./input";
export * from "./label";
export * from "./link";
export * from "./list";
export * from "./spin";
export * from "./markdown";
export * from "./modal";
export * from "./pagination";
export * from "./radio";
export * from "./resizable";
export * from "./scroll-area";
export * from "./table";
export * from "./tabs";
export * from "./tag";
export * from "./textarea";
export * from "./theme";
export * from "./toast";
export * from "./tooltip";

export * from "./extends/ButtonScrollToBottom";
export * from "./extends/TailwindIndicator";

export type DirectionType = "ltr" | "rtl";

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
