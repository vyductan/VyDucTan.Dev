// "use client";

import type { Session } from "@acme/auth";
import { signOut } from "@acme/auth";
import { Avatar } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import { Dropdown } from "@acme/ui/dropdown";

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
            // onSelect: (e) => {
            //   e.preventDefault();
            //   const a = document.getElementById(
            //     "signout-form",
            //   ) as HTMLFormElement;
            //
            //   a.submit();
            // },
            // label: "Sign Out",
            label: (
              <form>
                <Button
                  size="lg"
                  formAction={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  Sign out
                </Button>
              </form>
            ),
          },
        ],
      }}
      asChild
      placement="bottom-end"
    >
      <Button variant="ghost" className="relative size-10 rounded-full">
        <Avatar
          src={user.image ?? undefined}
          alt={user.name ?? "User avatar"}
          fallback={user.name?.[0] ?? undefined}
        />
      </Button>
    </Dropdown>
  );
};
