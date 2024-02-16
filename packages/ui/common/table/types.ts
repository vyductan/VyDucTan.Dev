import { ReactNode } from "react";

export type ColumnType<RecordType> = {
  dataIndex?: keyof RecordType;
  title?: string | ReactNode;
  render?: (record: RecordType, index: number) => ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
};
export type ColumnsType<RecordType> = ColumnType<RecordType>[];
