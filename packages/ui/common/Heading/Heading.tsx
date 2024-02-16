import { type HtmlHTMLAttributes } from "react";

type HeadingProps = HtmlHTMLAttributes<HTMLHeadingElement>;
export const H1 = ({ children, ...rest }: HeadingProps) => {
  return (
    <h1
      className="text-3xl font-extrabold"
      {...rest}
    >
      {children}
    </h1>
  );
};
