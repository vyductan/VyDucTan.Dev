import React from "react";

import type { InputProps } from "./Input";
import { Input } from "./Input";

type InputNumberProps = Omit<InputProps, "onChange" | "type"> & {
  onChange?: (value: number) => void;
};
const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ onChange, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        onChange={(e) => {
          return onChange?.(Number(e.target.value));
        }}
        {...props}
      />
    );
  },
);
InputNumber.displayName = "Input";
export { InputNumber };
export type { InputNumberProps };
