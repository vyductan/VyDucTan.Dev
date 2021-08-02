import Icon from "../../@vyductan/Icon";
import { IconType, IconName } from "../../@vyductan/Icon/Icon";

type SidebarItemProps = {
  title: string;
  active?: boolean;
  icon: { type?: IconType; name: IconName };
};
const SidebarItem = ({ title, icon, active }: SidebarItemProps) => {
  return (
    <div className="item group">
      <Icon
        type={icon.type}
        name={icon.name}
        className={`group-hover:text-blue-500 ${active && "text-blue-500"}`}
      />
      <div className="title">{title}</div>
    </div>
  );
};

export default SidebarItem;
