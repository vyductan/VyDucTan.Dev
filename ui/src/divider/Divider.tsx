"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { clsm } from "@vyductan/ui";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      children,
      ...props
    },
    ref,
  ) => {
    const separator = (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={clsm(
          "my-6",
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] flex-1" : "h-full w-[1px]",
          className,
        )}
        {...props}
      />
    );
    const Comp = children ? "div" : React.Fragment;
    return (
      <Comp {...(children ? { className: "flex items-center gap-2" } : {})}>
        {separator}
        {children && <div className="mb-px">{children}</div>}
        {children && separator}
      </Comp>
    );
  },
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator as Divider };
