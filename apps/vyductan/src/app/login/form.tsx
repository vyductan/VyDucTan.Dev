import { useSearchParams } from "next/navigation";
import { Icon } from "@vyductan/react";
import { Button } from "@vyductan/react/antd";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  return (
    <div>
      {/* {error && ( */}
      {/*   <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p> */}
      {/* )} */}

      <Button
        size="large"
        onClick={() => {
          signIn("google");
        }}
        prefix={<Icon className="icon-[logos--google-icon]" />}
      >
        Sign in with Google
      </Button>
    </div>
  );
};
