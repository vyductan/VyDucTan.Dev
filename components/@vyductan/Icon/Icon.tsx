import { SVGProps } from "react";
import getIconType from "./getIconType";
import { VyDucTanIcons } from "./src/vyductan";

type IconMap = { vyductan: VyDucTanIcons };
export type IconType = keyof IconMap;
export type IconName = IconMap[IconType];
// export type IconProps<IconName> = {
export type IconProps = {
  name: IconName;
  type?: IconType;
  className?: string;
  onClick?: () => void;
  svgProps?: SVGProps<SVGElement>;
};

// const Icon = <IconName extends IconMap[IconType]>({
const Icon = ({
  type = "vyductan",
  name,
  className,
  onClick,
  svgProps,
}: IconProps): JSX.Element => {
  // }: IconProps<IconName>): JSX.Element => {
  const Icons: { [key: string]: any } = getIconType(type);
  const I: React.FC<SVGProps<SVGElement>> = Icons[name];
  return I ? (
    <I
      width={undefined}
      height={undefined}
      fill="currentColor"
      className={className}
      onClick={onClick}
      {...svgProps}
    />
  ) : (
    <>{name}</>
  );
};
export default Icon;
