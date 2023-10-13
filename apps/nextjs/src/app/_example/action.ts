"use server";

import { createServerAction } from "@vyductan/react";

import { ExampleSchema } from "./schema";

export const sendMailAction = createServerAction(ExampleSchema)(async ({
  name,
}) => {
  // await
});
