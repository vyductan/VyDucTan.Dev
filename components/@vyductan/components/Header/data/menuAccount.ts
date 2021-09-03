import { IconName } from "../../../icons";

export type MenuModalItem = {
  name: string;
  iconName: IconName;
  children?: MenuModalItem[] | "custom";
};
export const menuAccount: MenuModalItem[] = [
  {
    name: "Settings & Privacy",
    iconName: "Setting",
    children: [
      {
        name: "Settings",
        iconName: "Setting",
      },
      {
        name: "Language",
        iconName: "Language",
      },
    ],
  },
  {
    name: "Help & Support",
    iconName: "QuestionSolid",
    children: [
      {
        name: "Help Center",
        iconName: "QuestionSolid",
      },
      {
        name: "Support Mailbox",
        iconName: "Mail",
      },
    ],
  },
  {
    name: "Screen & Accessibility",
    iconName: "Night",
    children: "custom",
  },
  {
    name: "Logout",
    iconName: "Exit",
  },
];
