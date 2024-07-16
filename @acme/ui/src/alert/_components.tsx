import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";

import { clsm } from "..";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      type: {
        default: "bg-background text-foreground",
        error:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      type: "default",
    },
  },
);

type AlertRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>;
const AlertRoot = React.forwardRef<HTMLDivElement, AlertRootProps>(
  ({ className, type, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={clsm(alertVariants({ type }), className)}
      {...props}
    />
  ),
);
AlertRoot.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={clsm("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsm("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { AlertRoot, AlertTitle, AlertDescription };
export type { AlertRootProps };
