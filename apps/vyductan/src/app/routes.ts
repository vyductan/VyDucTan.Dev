import { type BreadCrumbItemType, type Route } from "@vyductan/react";

export const FEATURES_ROUTES: Route = {
  pageName: "Features",
  path: "/features",
  routes: [
    {
      pageName: "ChatGPT",
      path: "/features/chatgpt",
    },
    {
      pageName: "Translate",
      path: "features/translate",
    },
  ],
};

export const UNNAMED_ROUTE: Route = {
  pageName: "Unnamed Page",
  path: "/",
};
export const APP_ROUTES = [FEATURES_ROUTES];

// Get Route from path
const parseRoutes = (routes: Route[]) => {
  let routesParsed: BreadCrumbItemType[] = [];

  routes.forEach((item) => {
    const { routes, ...rest } = item;
    const formattedItem = {
      ...rest,
    };

    routesParsed.push(formattedItem);

    if (routes) {
      const formattedChildren = parseRoutes(routes);
      routesParsed = [...routesParsed, ...formattedChildren];
    }
  });

  return routesParsed;
};
const routesParsed = parseRoutes(APP_ROUTES);
export const getRouteByPath = (path: string | null): Route => {
  return routesParsed.find((r) => r.path === path) || UNNAMED_ROUTE;
};

export const formatSegments = (segments: string[]) => {
  const formatedSegments: string[] = [];
  segments.forEach((segment, idx) => {
    const prev = formatedSegments[idx - 1];

    formatedSegments.push(`${prev || ""}${segment}`);
  });
  return formatedSegments;
};

export const getBreadcrumbItemsFromSegments = (segments: string[]) => {
  const breadCrumbItems: BreadCrumbItemType[] = [];
  segments.forEach((segment, idx) => {
    const p = `${breadCrumbItems[idx - 1]?.path || ""}${segment}`;
    const f = getRouteByPath(p);
    breadCrumbItems.push(f);
  });
  return breadCrumbItems;
};
