import { forwardRef, type ButtonHTMLAttributes, type Ref } from "react";

import { type ComponentSize } from "../types";
import clsm from "../_util/clsm";

export type ButtonProps = {
  type?: "primary" | "danger";
  size?: ComponentSize;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

const Button = forwardRef(
  (
    { children, className, htmlType, type, size = "md", ...rest }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const cls = clsm(
      "inline-flex items-center rounded-default text-center font-semibold",
      // 'transition-all duration-200',
      "[transition:all_.2s,box-shadow_0s]",
      "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-primary-border",
      "active:ring-4",
      !type && ["active:ring-gray-200"],
      type === "primary" && [
        "bg-primary text-white",
        "hover:bg-primary-hover",
        "active:ring-primary-border",
      ],
      type === "danger" && [
        "bg-red-500 text-white",
        "hover:bg-red-400",
        "active:ring-red-200",
      ],
      size === "sm" && "h-sm px-2 py-0",
      size === "md" && "h-md px-3 py-2 text-sm",
      size === "lg" && "h-lg px-4 py-2 text-lg",
      size === "xl" && "h-xl px-4 text-xl",
      className,
    );

    // if (href) {
    //   return (
    //     <Link
    //       {...rest}
    //       href={href}
    //       className={cls}
    //     >
    //       {children}
    //     </Link>
    //   )
    // }

    return (
      <button
        ref={ref}
        className={cls}
        type={htmlType}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

if (process.env.NODE_ENV !== "production") {
  Button.displayName = "Button";
}

export default Button;
