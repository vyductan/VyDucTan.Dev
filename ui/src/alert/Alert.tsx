import type {HTMLAttributes, ReactNode} from "react";

import { WarningFilled } from "@vyductan/icons";
import { clsm } from "@vyductan/utils";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  type: "success" | "warning";
  showIcon?: boolean;
};
const Alert = ({ children, className, showIcon, type }: AlertProps) => {
  const icon = type === "warning" ? <WarningFilled /> : null;
  return (
    <div
      className={clsm(
        "flex items-center px-3 py-2",
        "break-words text-sm",
        type === "warning" &&
          "border-warning bg-warning text-warning rounded-lg border",
        className,
      )}
    >
      {showIcon && <span className="me-2">{icon}</span>}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Alert;
