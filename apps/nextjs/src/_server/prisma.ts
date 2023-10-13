import { PrismaClient } from "@prisma/client";

import { VocabularyModel } from "~/_zod";
import { env } from "~/env.mjs";

const newPrisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
}).$extends({
  // https://www.prisma.io/docs/concepts/components/prisma-client/custom-validation
  query: {
    vocabulary: {
      create({ args, query }) {
        args.data = VocabularyModel.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = VocabularyModel.partial().parse(args.data);
        return query(args);
      },
    },
  },
});

// exports
const globalForPrisma = globalThis as unknown as {
  prisma: typeof newPrisma | undefined;
};
export const prisma = globalForPrisma.prisma ?? newPrisma;
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
