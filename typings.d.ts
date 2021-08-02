import React from "react";
declare module "*.svg" {
  const src: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}

declare type PartialNull<T> = {
  [P in keyof T]?: T[P] | undefined | null;
};
