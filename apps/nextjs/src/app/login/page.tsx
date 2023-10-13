"use client";

import { LoginForm } from "./form";

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <section>
        <LoginForm />
      </section>
    </div>
  );
}
