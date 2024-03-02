import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";

import { clsm } from "@vyductan/ui";

export const inputStatusVariants = cva(
  [
    "w-full px-3 py-[9px]",
    "flex rounded-md border border-input ring-offset-background",
    "text-sm",
    "focus-within:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      borderless: {
        true: ["border-0", "focus-within:outline-none"],
        false: ["border", "rounded-md", "focus-within:ring-2"],
      },
      status: {
        default: [
          "hover:border-primary-500",
          "focus-within:!border-primary-600 focus-within:ring-primary-100",
        ],
      },
    },
    defaultVariants: {
      borderless: false,
      status: "default",
    },
  },
);
type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputStatusVariants> & {
    suffix?: React.ReactNode;
  };
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ borderless, className, id, status, suffix, onChange, ...props }, ref) => {
    const useId = React.useId();
    const _id = id ?? useId;

    return (
      <span
        className={clsm(
          inputStatusVariants({ borderless, status }),
          "cursor-text",
          className,
        )}
        aria-hidden="true"
        onClick={() => {
          document.getElementById(_id)?.focus();
        }}
      >
        <input
          id={_id}
          className={clsm(
            "w-full",
            "bg-transparent",
            "placeholder:text-muted-foreground",
            "border-none outline-none",
          )}
          ref={ref}
          onChange={(e) => {
            onChange?.(e);
          }}
          {...props}
        />
        {suffix && <span>{suffix}</span>}
      </span>
    );
  },
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
