import { Tooltip } from "antd";
import { Icon, IconName } from "../../icons";

type HeaderIconProps = {
  tooltip: string;
  active?: boolean;
  iconName: IconName;
};
const HeaderIcon = ({ tooltip, iconName, active }: HeaderIconProps) => {
  return (
    <Tooltip title={tooltip}>
      <div
        className="flex items-center cursor-pointer sm:h-10 md:px-10 md:hover:bg-gray-100 rounded-xl
      active:border-b-2 active:border-blue-500
      group"
      >
        <Icon
          name={iconName}
          className={`text-gray-500 h-5 sm:h-7 group-hover:text-blue-500 ${
            active && "text-blue-500"
          }`}
        />
      </div>
    </Tooltip>
  );
};

export default HeaderIcon;
