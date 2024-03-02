"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { clsm } from "@vyductan/ui";

type PopoverRootProps = PopoverPrimitive.PopoverProps;
const PopoverRoot = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

type PopoverContentProps = PopoverPrimitive.PopoverContentProps;
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    // PopoverPrimitive.Portal was removed to fix https://github.com/shadcn-ui/ui/issues/332#issuecomment-1747751831
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={clsm(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export type { PopoverRootProps, PopoverContentProps };
export { PopoverRoot, PopoverTrigger, PopoverContent };
