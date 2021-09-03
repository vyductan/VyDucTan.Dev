import { IconName } from "../../../icons";

type NavItem = {
  name: string;
  iconName: IconName;
  iconActive: IconName;
};
export const navItems: NavItem[] = [
  {
    name: "Home",
    iconName: "HomeOutline",
    iconActive: "HomeSolid",
  },
  {
    name: "Friend",
    iconName: "FriendOutline",
    iconActive: "FriendSolid",
  },
  {
    name: "Watch",
    iconName: "VideoOutline",
    iconActive: "VideoSolid",
  },
  {
    name: "Marketplace",
    iconName: "ShopOutline",
    iconActive: "ShopSolid",
  },
  {
    name: "Group",
    iconName: "GroupOutline",
    iconActive: "GroupSolid",
  },
];
