import type { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { z } from "zod";

import type { Database, SQL } from "../_db";
import { count } from "../_db";

export const DEFAULT_PAGE_SIZE = 10;
export type Pagination = z.infer<typeof paginationSchema>;

export const paginationSchema = z.object({
  page: z.number().min(1),
  pageSize: z.number().min(1).optional(),
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
