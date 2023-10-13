"use client";

import Link from "next/link";
import { Button } from "@vyductan/ui";
import { signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="h-20 bg-white">
      <nav className="container flex h-full items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-2xl font-semibold"
          >
            CodevoWeb
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Button onClick={() => signOut()}>Logout</Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
