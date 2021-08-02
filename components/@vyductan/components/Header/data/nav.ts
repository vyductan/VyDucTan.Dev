import { IconName, IconType } from "../../../Icon/Icon";

type NavItem = {
  name: string;
  iconType: IconType;
  iconName: IconName;
  iconActive: IconName;
};
export const navItems: NavItem[] = [
  {
    name: "Home",
    iconType: "vyductan",
    iconName: "HomeOutline",
    iconActive: "HomeSolid",
  },
  {
    name: "Friend",
    iconType: "vyductan",
    iconName: "FriendOutline",
    iconActive: "FriendSolid",
  },
  {
    name: "Watch",
    iconType: "vyductan",
    iconName: "VideoOutline",
    iconActive: "VideoSolid",
  },
  {
    name: "Marketplace",
    iconType: "vyductan",
    iconName: "ShopOutline",
    iconActive: "ShopSolid",
  },
  {
    name: "Group",
    iconType: "vyductan",
    iconName: "GroupOutline",
    iconActive: "GroupSolid",
  },
];
