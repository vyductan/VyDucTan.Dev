import { Tooltip } from "antd";
import Icon from "../../Icon";
import { IconType, IconName } from "../../Icon/Icon";

type HeaderIconProps = {
  tooltip: string;
  active?: boolean;
  icon: { type?: IconType; name: IconName };
};
const HeaderIcon = ({ tooltip, icon, active }: HeaderIconProps) => {
  return (
    <Tooltip title={tooltip}>
      <div
        className="flex items-center cursor-pointer sm:h-10 md:px-10 md:hover:bg-gray-100 rounded-xl
      active:border-b-2 active:border-blue-500
      group"
      >
        <Icon
          type={icon.type}
          name={icon.name}
          className={`text-gray-500 h-5 sm:h-7 group-hover:text-blue-500 ${
            active && "text-blue-500"
          }`}
        />
      </div>
    </Tooltip>
  );
};

export default HeaderIcon;
