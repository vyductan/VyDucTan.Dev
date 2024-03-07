"use client";

/*
 *
 * https://ant.design/components/table#components-table-demo-expand
 *
 */
import type { ExpandedState } from "@tanstack/react-table";
import type { ForwardedRef, HTMLAttributes, ReactNode } from "react";
import React, { forwardRef, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { clsm } from "@vyductan/ui";

import type { PaginationProps } from "../pagination";
import type { TableColumnDef } from "./types";
import { Pagination } from "../pagination";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableHead } from "./TableHead";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { transformColumnDefs } from "./utils";

type RecordWithCustomRow<
  TRecord extends Record<string, unknown> = Record<string, unknown>,
> =
  | (TRecord & {
      _customRow?: undefined;
      _customRowClassName?: undefined;
    })
  | (Partial<TRecord> & {
      _customRow: string;
      _customRowClassName: string;
    });
type TableProps<TRecord extends RecordWithCustomRow> =
  HTMLAttributes<HTMLTableElement> & {
    columns: TableColumnDef<TRecord>[];
    dataSource: TRecord[];
    // emptyRender?: EmptyProps;
    expandable?: {
      expandedRowKeys: string[];
      expandedRowRender: (record: TRecord) => ReactNode;
      rowExpandable?: (record: TRecord) => boolean;
      onExpand?: (record: TRecord) => void;
    };
    rowKey?: keyof TRecord;
    rowClassName?: (record: TRecord, index: number) => string;
    pagination?: PaginationProps;

    bordered?: boolean;
    loading?: boolean;
    /** Set sticky header and scroll bar */
    sticky?: boolean;
    size?: "smal" | "default";

    scroll?: {
      x: boolean;
    };
  };

const TableInner = <TRecord extends Record<string, unknown>>(
  {
    className,
    columns: columnsProp,
    dataSource,
    pagination,
    rowClassName,

    sticky,
    scroll,
    ...props
  }: TableProps<TRecord>,
  ref: ForwardedRef<HTMLTableElement>,
) => {
  const data = React.useMemo(() => dataSource, [dataSource]);
  const columns = React.useMemo(
    () => transformColumnDefs(columnsProp),
    [columnsProp],
  );

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    state: {
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),

    getSubRows: (record) => record.children as TRecord[],
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
      {/* <div className="relative w-full overflow-x-auto"> */}
      {/* {loading && <Loader backdrop className="tw-z-10" />} */}
      <table
        ref={ref}
        className={clsm(
          "w-full caption-bottom text-sm",
          "border-separate border-spacing-0",
          // bordered &&
          //   "tw-border tw-rounded-xl tw-border-solid tw-border-neutral-40",
          className,
        )}
        // style={{
        //   ...(scroll?.x
        //     ? {
        //         width: table.getCenterTotalSize(),
        //       }
        //     : {}),
        // }}
        {...props}
      >
        {columns.some((column) => column.size) && (
          <colgroup>
            {columns.map((col, index) => (
              <col
                key={index}
                {...(col.size ? { style: { width: col.size } } : {})}
              />
            ))}
          </colgroup>
        )}

        <TableHeader className={clsm("", sticky ? "sticky top-0" : "")}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    scope="col"
                    // colSpan={header.colSpan}
                    {...(scroll && header.column.columnDef.size
                      ? {
                          style: {
                            width: header.getSize(),
                          },
                        }
                      : {})}
                    className={clsm(
                      header.column.columnDef.meta?.align === "center" &&
                        "text-center",
                      header.column.columnDef.meta?.align === "right" &&
                        "text-right",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) =>
              row.original._customRow ? (
                <TableRow key={row.id}>
                  <TableCell
                    colSpan={columns.length}
                    className={clsm(row.original._customRowClassName as string)}
                  >
                    {row.original._customRow as React.ReactNode}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={rowClassName?.(row.original, index)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      {...(scroll && cell.column.columnDef.size
                        ? {
                            style: {
                              width: cell.column.getSize(),
                            },
                          }
                        : {})}
                      className={clsm(
                        typeof cell.column.columnDef.meta?.className ===
                          "string"
                          ? cell.column.columnDef.meta?.className
                          : cell.column.columnDef.meta?.className?.(
                              row.original,
                              index,
                            ),
                        cell.column.columnDef.meta?.align === "center" &&
                          "text-center",
                        cell.column.columnDef.meta?.align === "right" &&
                          "text-right",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ),
            )
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </table>
      {pagination && <Pagination {...pagination} />}
      {/* </div> */}
    </>
  );
};

const Table = forwardRef(TableInner) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: ForwardedRef<HTMLUListElement> },
) => ReturnType<typeof TableInner>;

export { Table };

export type { TableProps, RecordWithCustomRow };
