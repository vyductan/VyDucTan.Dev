import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@vyductan/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@vyductan/api";
