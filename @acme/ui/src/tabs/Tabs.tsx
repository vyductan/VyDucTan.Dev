"use client";

import * as React from "react";

import type {
  TabsListProps,
  TabsRootProps,
  TabsRootRef,
  TabsTriggerProps,
} from "./_components";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "./_components";

type TabsProps = Omit<TabsRootProps, "defaultValue" | "onValueChange"> & {
  /**
   * Initial active TabPane's key, if activeKey is not set
   */
  defaultActiveKey?: TabsRootProps["defaultValue"];
  items: {
    key: string;
    label: React.ReactNode;
    children: React.ReactNode;
  }[];
  onChange?: (activeKey: string) => void;

  // styles
  // list
  listProps?: TabsListProps;
  triggerProps?: Omit<TabsTriggerProps, "value">;
};
const Tabs = React.forwardRef<TabsRootRef, TabsProps>(
  (
    { defaultActiveKey, items, onChange, listProps, triggerProps, ...props },
    ref,
  ) => {
    return (
      <>
        <TabsRoot
          ref={ref}
          defaultValue={defaultActiveKey}
          onValueChange={onChange}
          {...props}
        >
          <TabsList {...listProps}>
            {items.map((x) => (
              <TabsTrigger key={x.key} value={x.key} {...triggerProps}>
                {x.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {items.map((x) => (
            <TabsContent key={x.key} value={x.key}>
              {x.children}
            </TabsContent>
          ))}
        </TabsRoot>
      </>
    );
  },
);

Tabs.displayName = "Tabs";

export { Tabs };
export type { TabsProps };
