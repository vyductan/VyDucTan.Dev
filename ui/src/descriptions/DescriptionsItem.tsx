import { clsm } from "..";

export type DescriptionsItemProps = {
  label?: React.ReactNode;
  children?: React.ReactNode;
};
export const DescriptionsItem = ({
  label,
  children,
}: DescriptionsItemProps) => {
  return (
    <>
      <th
        className={clsm(
          "bg-background-200 text-start text-sm font-normal",
          "border-e px-6 py-4",
          "text-secondary",
        )}
      >
        <span>{label}</span>
      </th>
      <td
        className={clsm("break-all", "border-e px-6 py-4", "last:border-none")}
      >
        <span>{children ? children : "-"}</span>
      </td>
    </>
  );
};
