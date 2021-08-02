import { ReactNode } from "react";
import Icon from "../../Icon";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { toggleSidebarVisible } from "../../../stores/settings";
// import User from "../User";
import SidebarItem from "./SidebarItem";
import { IconName, IconType } from "../../Icon/Icon";

export const ButtonOpenSidebar = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="icon" onClick={() => dispatch(toggleSidebarVisible())}>
      <Icon name="Menu" />
    </div>
  );
};

type SidebarItem = {
  title: string;
  iconType: IconType;
  iconName: IconName;
};
type SidebarProps = {
  items: SidebarItem[];
  Header?: ReactNode;
  Footer?: ReactNode;
};
const Sidebar = ({ items, Header, Footer }: SidebarProps) => {
  // const [sidebarVisible, setSidebarVisiable] = useState(true);
  const sidebarVisible = useAppSelector(
    (state) => state.settings.sidebarVisible
  );

  return (
    <div
      className={`bg-gray-100 p-4 lg:block w-80 h-screen ${
        sidebarVisible ? "fixed z-40" : "hidden"
      }`}
    >
      {Header}

      {items.map((x) => {
        return (
          <SidebarItem
            key={x.title}
            title={x.title}
            icon={{ type: x.iconType, name: x.iconName }}
          />
        );
      })}

      {Footer}
    </div>
  );
};
export default Sidebar;
