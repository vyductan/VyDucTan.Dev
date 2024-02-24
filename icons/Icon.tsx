"use client";

import type { IconProps as IconifyProps } from "@iconify/react";
import { Icon as Iconify } from "@iconify/react";

import { clsm } from "@vyductan/ui";

// https://icon-sets.iconify.design/
export type IconProps = IconifyProps & {
  srOnly?: string;
};
export const Icon = ({ className, srOnly, ...props }: IconProps) => {
  return (
    <>
      <Iconify className={clsm("h-5 w-5", className)} {...props} />
      {srOnly && <span className="sr-only">{srOnly}</span>}
    </>
  );
};
