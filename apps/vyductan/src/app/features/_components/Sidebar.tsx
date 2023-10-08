import { type HtmlHTMLAttributes } from "react";
import { clsm, Link } from "@vyductan/react";

import { FEATURES_ROUTES } from "~/app/routes";

type FeaturesSidebarProps = HtmlHTMLAttributes<HTMLElement>;
export const FeaturesSidebar = ({
  className,
  ...restProps
}: FeaturesSidebarProps) => {
  return (
    <nav
      className={clsm("w-72 p-6", className)}
      {...restProps}
    >
      <ul>
        {FEATURES_ROUTES.routes?.map(({ label, path }) => (
          <li key={path}>
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
