import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

import { env as authEnv } from "@acme/auth/env";

export const env = createEnv({
  extends: [authEnv, vercel()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    // Database
    // DATABASE_URL: z.string().url(),
    POSTGRES_URL: z.string().url(),
    POSTGRES_URL_NON_POOLING: z.string().url(),

    // OpenAI
    OPENAI_API_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
