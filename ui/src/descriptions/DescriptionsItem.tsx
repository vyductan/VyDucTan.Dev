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
        {label}
      </th>
      <td className={clsm("border-e px-6 py-4", "last:border-none")}>
        {children ? children : "-"}
      </td>
    </>
  );
};
