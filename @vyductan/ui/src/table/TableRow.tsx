import { forwardRef } from "react";

import { clsm } from "@vyductan/ui";

import { tableStyles } from "./styles";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={clsm(
      "transition-colors",
      tableStyles.row.classNames,
      tableStyles.row.hoverByCssClassNames,
      "data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";
