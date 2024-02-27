import { useResponsive } from "@vyductan/hooks";

import type { Screens } from "../theme";
import type { DescriptionsItemProps } from "./DescriptionsItem";
import { clsm } from "..";
import { DescriptionsItem } from "./DescriptionsItem";

type DescriptionProps = {
  title?: React.ReactNode;
  items: DescriptionsItemProps[];
  bordered?: boolean;
  column?: number | Partial<Record<Screens, number>>;
};
export const Descriptions = ({
  title,
  items,
  bordered,
  column,
}: DescriptionProps) => {
  const x = useResponsive();
  const currentScreen = Object.entries(x)
    .filter(([, v]) => v)
    .slice(-1)[0]![0] as Screens;
  const mergedColumn =
    typeof column === "number"
      ? column
      : typeof column === "object"
        ? column[currentScreen]!
        : 3;
  function chunkArray<T>(array: T[], size: number): T[][] {
    const chunkedArray: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  }
  const rows = chunkArray(items, mergedColumn);

  return (
    <div>
      <div className="text-lg font-semibold">{title}</div>
      <div className={clsm(bordered && "border")}>
        <table
          className={clsm("w-full", bordered ? "table-auto" : "table-fixed")}
        >
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={clsm("mb-[1px] border-b", "last:border-none")}
              >
                {row.map((col, colIndex) => (
                  <DescriptionsItem key={colIndex} {...col} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
