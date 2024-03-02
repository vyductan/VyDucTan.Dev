import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { clsm } from "..";
import { Icon } from "../icons";

type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  "onChange" | "onCheckedChange"
> & {
  onChange?: (checked: boolean) => void;
};
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, onChange, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={clsm(
      "peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-white",
      className,
    )}
    onCheckedChange={onChange}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={clsm("flex items-center justify-center text-current")}
    >
      <Icon icon="mingcute:check-fill" className="size-[14px]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
