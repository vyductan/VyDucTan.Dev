import type { Column, Row, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

type Meta<TRecord> = {
  className?: string | ((record: TRecord, index: number) => string);
  align?: "left" | "right" | "center";
};
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  interface ColumnMeta<TData extends RowData, TValue> extends Meta<TData> {}
}

/**
 * TRecord[K] inherit from https://stackoverflow.com/a/56837244
 */
type BaseTableColumnDef<TRecord> = {
  hidden?: boolean;
  title?: string | ReactNode;
  width?: number;

  enableResizing?: boolean;
} & Meta<TRecord>;
export type ExtraTableColumnDef<TRecord> = {
  fixed?: "left" | "right";
  children?: TableColumnDef<TRecord>[];
};

type DefWithOutDataIndex<TRecord> = BaseTableColumnDef<TRecord> & {
  dataIndex?: never;
  render?: (ctx: RenderContext<TRecord>) => ReactNode;
};
export type TableColumnDef<TRecord> = ExtraTableColumnDef<TRecord> &
  (
    | DefWithOutDataIndex<TRecord>
    | (BaseTableColumnDef<TRecord> &
        {
          [K in keyof TRecord]-?: {
            dataIndex: K;
            render?: (
              ctx: RenderContext<TRecord> & {
                value: TRecord[K];
              },
            ) => ReactNode;
          };
        }[keyof TRecord])
  );

type RenderContext<TRecord> = {
  record: TRecord;
  index: number;
  row: Row<TRecord>;
  column: Column<TRecord>;
};
