"use client";

import { useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { useResizeObserver } from "@vyductan/hooks";
import { Button } from "@vyductan/ui";

import { useAppStore } from "../store";

export const Header = () => {
  const { data: session } = useSession();
  const {
    ref,
    rect: { height },
  } = useResizeObserver();
  const { headerHeight, setHeaderHeight } = useAppStore();
  const user = session?.user;

  useEffect(() => {
    console.log("h", height);
    if (headerHeight !== height) {
      setHeaderHeight(height);
    }
  }, [headerHeight, height, setHeaderHeight]);

  return (
    <header ref={ref} className="h-20 bg-background">
      <nav className="container flex h-full items-center justify-between">
        <div>
          <Link className="text-2xl font-semibold" href="/">
            VyDucTan
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          ) : null}
          {user ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Button onClick={() => signOut()}>Logout</Button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};
