"use client";

import type { Session } from "@vyductan/auth";

import { Avatar, Button, Dropdown } from "@vyductan/components";

type UserNavProps = {
  user: Session["user"];
};
export const UserNav = ({ user }: UserNavProps) => {
  if (!user) {
    return <Button>Sign in</Button>;
  }

  return (
    <Dropdown
      menu={{
        className: "w-56",
        items: [
          {
            key: "user",
            as: "title",
            label: (
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            ),
          },
          {
            as: "separator",
          },
          {
            group: [
              {
                label: "Profile",
                shortcut: "⇧⌘P",
              },
            ],
          },
          {
            as: "separator",
          },
          {
            key: "signout",
            onSelect: (e) => {
              e.preventDefault();
              const a = document.getElementById(
                "signout-form",
              ) as HTMLFormElement;

              a.submit();
            },
            label: "Sign Out",
          },
        ],
      }}
      asChild
      placement="bottom-end"
    >
      <Button type="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar
          src={user.image ?? undefined}
          alt={user.name ?? "User avatar"}
          fallback={user.name?.[0] ?? undefined}
        />
      </Button>
    </Dropdown>
  );
};
