export type MenuItemDef = {
  key?: React.Key;
  label?: React.ReactNode;
  // Set display title for collapsed item
  title?: React.ReactNode;
  children?: MenuItemDef[];
};
