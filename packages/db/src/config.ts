import type { Config } from "drizzle-kit";
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { DB_PREFIX } from "./schema/_table";

const env = createEnv({
  server: {
    // DB_HOST: z.string(),
    // DB_NAME: z.string(),
    // DB_USERNAME: z.string(),
    // DB_PASSWORD: z.string(),
    POSTGRES_URL: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

// Push requires SSL so use URL instead of username/password
// export const connectionStr = new URL(`postgres://${env.DB_HOST}/${env.DB_NAME}`);
// connectionStr.username = env.DB_USERNAME;
// connectionStr.password = env.DB_PASSWORD;
// connectionStr.searchParams.set("ssl", '{"rejectUnauthorized":true}');
//
// export default {
//   schema: "./src/schema",
//   driver: "mysql2",
//   dbCredentials: { uri: connectionStr.href },
//   tablesFilter: ["t3turbo_*"],
// } satisfies Config;

export default {
  // schema: "./src/**/schema.ts",
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: [DB_PREFIX + "*"],
} satisfies Config;
