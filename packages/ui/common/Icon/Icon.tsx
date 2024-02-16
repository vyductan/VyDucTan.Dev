import { type DetailedHTMLProps, type HTMLAttributes } from "react";

import clsm from "../_util/clsm";

export type IconProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;
export const Icon = ({ className, ...restProps }: IconProps) => {
  return (
    <span
      className={clsm("h-5 w-5", className)}
      {...restProps}
    />
  );
};
