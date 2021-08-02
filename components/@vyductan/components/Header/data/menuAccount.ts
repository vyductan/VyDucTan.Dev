import { IconName, IconType } from "../../../Icon/Icon";

export type MenuModalItem = {
  name: string;
  iconType?: IconType;
  iconName: IconName;
  children?: MenuModalItem[] | "custom";
};
export const menuAccount: MenuModalItem[] = [
  {
    name: "Settings & Privacy",
    iconType: "vyductan",
    iconName: "Setting",
    children: [
      {
        name: "Settings",
        iconType: "vyductan",
        iconName: "Setting",
      },
      {
        name: "Language",
        iconType: "vyductan",
        iconName: "Language",
      },
    ],
  },
  {
    name: "Help & Support",
    iconType: "vyductan",
    iconName: "QuestionSolid",
    children: [
      {
        name: "Help Center",
        iconType: "vyductan",
        iconName: "QuestionSolid",
      },
      {
        name: "Support Mailbox",
        iconType: "vyductan",
        iconName: "Mail",
      },
    ],
  },
  {
    name: "Screen & Accessibility",
    iconType: "vyductan",
    iconName: "Night",
    children: "custom",
  },
  {
    name: "Logout",
    iconType: "vyductan",
    iconName: "Exit",
  },
];
