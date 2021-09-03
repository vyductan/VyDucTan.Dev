import { Icon, IconName } from "../../icons";

type SidebarItemProps = {
  title: string;
  active?: boolean;
  iconName: IconName;
};
const SidebarItem = ({ title, iconName, active }: SidebarItemProps) => {
  return (
    <div className="item group">
      <Icon
        name={iconName}
        className={`group-hover:text-blue-500 ${active && "text-blue-500"}`}
      />
      <div className="title">{title}</div>
    </div>
  );
};

export default SidebarItem;
