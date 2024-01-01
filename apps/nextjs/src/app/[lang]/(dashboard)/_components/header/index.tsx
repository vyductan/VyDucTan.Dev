import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@vyductan/api/auth";
import { Button } from "@vyductan/ui";

import { SignoutForm } from "./SignoutForm";
import { UserNav } from "./UserNav";

export const HEADER_HEIGHT = 80;
export const Header = async () => {
  const session = await auth();

  return (
    <header className="h-20 bg-background">
      <nav className="container flex h-full items-center justify-between">
        <div>
          <Link className="text-2xl font-semibold" href="/">
            VyDucTan
          </Link>
        </div>

        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          <Link href="/">Home</Link>
        </nav>

        <div className="ml-auto">
          {!session ? (
            <Button type="primary">
              <Link href={`/signin?callbackUrl=${headers().get("referer")}`}>
                Sign In
              </Link>
            </Button>
          ) : (
            <>
              <UserNav user={session.user} />
              <SignoutForm />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
