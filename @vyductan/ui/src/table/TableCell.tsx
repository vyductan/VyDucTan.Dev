import { forwardRef } from "react";

import { clsm } from "..";

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={clsm(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      "border-b",
      "group-hover:bg-background-hover",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";
