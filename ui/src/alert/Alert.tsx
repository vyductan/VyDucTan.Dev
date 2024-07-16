import type { ReactNode } from "react";

import type { AlertRootProps } from "./_components";
import { clsm } from "..";
import { Icon } from "../icons";
import { AlertDescription, AlertRoot, AlertTitle } from "./_components";

type AlertProps = AlertRootProps & {
  title?: ReactNode;
  message?: ReactNode;
  showIcon?: boolean;
};
const Alert = ({ title, message, className, showIcon, type }: AlertProps) => {
  const icon =
    type === "warning" ? (
      <Icon className="icon-[mingcute--warning-line]" />
    ) : null;
  return (
    <AlertRoot type={type} className={clsm(className)}>
      {showIcon && <span className="me-2">{icon}</span>}
      {title && <AlertTitle>{title}</AlertTitle>}
      {message && <AlertDescription>{message}</AlertDescription>}
    </AlertRoot>
  );
};

export default Alert;
