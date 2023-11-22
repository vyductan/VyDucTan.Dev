import React from "react";

import { signOut } from "@vyductan/auth";

export const SignoutForm = () => {
  return (
    <form
      id="signout-form"
      action={async () => {
        "use server";
        await signOut();
      }}
    />
  );
};
