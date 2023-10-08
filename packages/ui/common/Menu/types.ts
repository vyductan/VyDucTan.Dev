export type MenuDataItem = {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  name?: string;
  pageName: string;
  path: string;
  [key: string]: any;
};

export type Route = MenuDataItem & {
  routes?: Route[];
};
