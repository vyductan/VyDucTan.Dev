import { SVGProps } from "react";
import { IconName } from "./typings";

export type IconProps = {
  name: IconName;
  className?: string;
  onClick?: () => void;
  svgProps?: SVGProps<SVGElement>;
};

const Icon = (props: { name: IconName } & SVGProps<SVGElement>) => {
  const getIcon = () => {
    try {
      const VdtIcon = require("../lib/" + props.name + "Icon").default;
      if (VdtIcon) {
        return <VdtIcon {...props} />;
      } else {
        throw "Icon doesn't exist.";
      }
    } catch (e) {
      return <>{props.name}</>;
    }
  };
  return getIcon();
};
export default Icon;
