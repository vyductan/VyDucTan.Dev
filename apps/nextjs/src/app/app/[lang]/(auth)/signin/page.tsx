import { signIn } from "@vyductan/api/auth";
import { Button } from "@vyductan/ui/button";
import { Icon } from "@vyductan/ui/icons";

export default function LoginPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <section>
        <form>
          <Button
            size="lg"
            icon={<Icon icon="logos:google-icon" />}
            formAction={async () => {
              "use server";
              await signIn("google", { redirectTo: callbackUrl });
            }}
          >
            Sign in with Google
          </Button>
        </form>
      </section>
    </div>
  );
}
