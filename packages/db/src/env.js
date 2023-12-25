import { createEnv } from "@t3-oss/env-nextjs";
import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: "../../.env" });

export const env = createEnv({
  server: {
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),
  },
  runtimeEnv: {
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  },
});
