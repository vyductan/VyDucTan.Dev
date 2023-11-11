import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@vyductan/components";
import { Icon } from "@vyductan/icons";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  return (
    <div>
      {/* {error && ( */}
      {/*   <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p> */}
      {/* )} */}

      <Button
        size="lg"
        onClick={() => {
          signIn("google");
        }}
        prefix={<Icon name="logos:google-icon" />}
      >
        Sign in with Google
      </Button>
    </div>
  );
};
