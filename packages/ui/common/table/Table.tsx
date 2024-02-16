import clsm from "../_util/clsm";
import { Icon } from "../Icon";
import { Loading } from "../Loading";
import { ColumnsType } from "./types";

export type TableProps<RecordType extends Record<string, any>> = {
  columns: ColumnsType<RecordType>;
  dataSource?: RecordType[];
  className?: string;
  bordered?: boolean;
  loading?: boolean;
  sticky?: boolean;
  size?: "smal" | "default";
  onRow?: (record: RecordType) => void;
};
const Table = <RecordType extends Record<string, any>>({
  columns,
  dataSource,
  className,
  bordered,
  loading,
  size,
  sticky,
  onRow,
}: TableProps<RecordType>) => {
  return (
    <div
      className={clsm(
        bordered ? "border-c-default rounded-xl border" : "",
        "relative bg-white text-sm text-c-default",
      )}
    >
      {loading && <Loading />}
      <table className={clsm(className?.trim() || "", "min-w-full")}>
        <thead className={clsm(sticky ? "sticky top-0" : "")}>
          <tr>
            {columns.map(({ title, align, className = "" }, idx) => (
              <th
                key={idx}
                scope="col"
                className={clsm(
                  className,
                  align === "center" ? "text-center" : "",
                  align === "right" ? "text-right" : "",
                  "text-left text-xs font-semibold 2xl:text-sm",
                  "border-c-default border-b",
                  bordered ? "border-x first:border-l-0 last:border-r-0" : "",
                  !size || size === "default" ? "p-4" : "",
                  size === "smal" ? "p-2" : "",
                )}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dataSource && dataSource.length > 0 ? (
            dataSource.map((item, index) => (
              <tr
                key={`table-row-${index}`}
                onClick={() => onRow?.(item)}
              >
                {columns.map((column, idx) => (
                  <td
                    key={idx}
                    className={clsm(
                      column.align === "center" ? "text-center" : "",
                      column.align === "right" ? "text-right" : "",
                      "text-xs font-semibold text-c-default 2xl:text-sm",
                      "border-c-default border-b",
                      index === dataSource.length ? "border-b" : "", // remove border bottom if is last item
                      bordered
                        ? "border-x first:border-l-0 last:border-r-0"
                        : "",
                      !size || size === "default" ? "p-4" : "",
                      size === "smal" ? "p-2" : "",
                    )}
                  >
                    {column.render ? (
                      column.render(item, index)
                    ) : column.dataIndex ? (
                      <>{item[column.dataIndex]}</>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="h-40 text-center text-c-disabled"
                colSpan={columns.length}
              >
                <Icon className="icon-[heroicons--inbox] h-12 w-12" />
                <div>Data Not Found</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
