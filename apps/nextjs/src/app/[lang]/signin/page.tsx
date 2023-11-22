import { signIn } from "@vyductan/auth";
import { Button } from "@vyductan/components";
import { Icon } from "@vyductan/icons";

export default function LoginPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <section>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: callbackUrl });
          }}
        >
          <Button size="lg" icon={<Icon icon="logos:google-icon" />}>
            Sign in with Google
          </Button>
        </form>
      </section>
    </div>
  );
}
