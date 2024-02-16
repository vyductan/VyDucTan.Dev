import { Fragment, ReactNode } from "react";
import { Tab as HeadlessTab } from "@headlessui/react";
import { clsm } from "@vyductan/react/utils/clsm";

type TabItemType = {
  key?: string;
  label?: ReactNode;
  children?: ReactNode;
};
type TabsType = TabItemType[];
export type TabsProps = {
  items: TabsType;
};
export const Tabs = ({ items }: TabsProps) => {
  return (
    <HeadlessTab.Group>
      <HeadlessTab.List className="flex space-x-1 rounded-xl bg-blue-900/20">
        {items.map(({ key, label }) => (
          <HeadlessTab
            key={key}
            className={({ selected }) =>
              clsm(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
              )
            }
          >
            {label}
          </HeadlessTab>
        ))}
      </HeadlessTab.List>

      <HeadlessTab.Panels as={Fragment}>
        {items.map(({ key, children }) => (
          <HeadlessTab.Panel
            key={key}
            // unmount={false}
            className={clsm("mt-2 rounded-xl bg-white")}
          >
            {children}
          </HeadlessTab.Panel>
        ))}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
};
