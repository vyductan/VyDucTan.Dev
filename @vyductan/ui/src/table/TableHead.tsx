import React from "react";

import { clsm } from "@vyductan/ui";

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={clsm(
      "h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0",
      "break-words font-medium text-foreground",
      "first:rounded-tl-md last:rounded-tr-md",

      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";
