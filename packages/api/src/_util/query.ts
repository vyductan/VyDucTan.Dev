import type { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { z } from "zod";

import type { Database } from "@acme/api/_db";
import type { SQL } from "@acme/db";
import { count } from "@acme/db";

export const DEFAULT_PAGE_SIZE = 10;
export type Pagination = z.infer<typeof paginationSchema>;

export const paginationSchema = z.object({
  page: z.number().min(1).catch(1),
  pageSize: z.number().min(1).catch(10),
});

export const searchSchema = z.object({
  query: z.string().optional(),
});

export const withPagination = async <T extends TableConfig>(
  db: Database,
  table: PgTableWithColumns<T>,
  { page, pageSize = DEFAULT_PAGE_SIZE }: Pagination,
  where?: SQL,
) => {
  const [data, [lenghts]] = await Promise.all([
    db
      .select()
      .from(table)
      .where(where)
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ count: count() }).from(table).where(where),
  ]);
  return {
    data,
    pagination: {
      total: lenghts?.count ?? 0,
      page,
      pageSize,
    },
  };
};

export const countQuery = async <T extends TableConfig>(
  db: Database,
  table: PgTableWithColumns<T>,
  where?: SQL,
) => (await db.select({ count: count() }).from(table).where(where))[0]?.count;

export const withPaginationQuery = async <T>(
  data: T,
  count: number | undefined,
  { page, pageSize = DEFAULT_PAGE_SIZE }: Pagination,
) => {
  return {
    data,
    pagination: {
      total: count ?? 0,
      page,
      pageSize,
    },
  };
};
