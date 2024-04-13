import React from "react";

import { signOut } from "@acme/auth";

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
