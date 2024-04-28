/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
"use client";

import type {
  AnyContext,
  AnyRoute,
  ParsePathParams,
  ResolveAllParams,
  ResolveFullPath,
  ResolveFullSearchSchema,
  ResolveFullSearchSchemaInput,
  ResolveId,
  Route,
  RouteConstraints,
  RouteContext,
  RouteOptions,
  SearchSchemaInput,
  UseNavigateResult,
} from "@tanstack/react-router";
import type { z } from "zod";
import {
  useParams as useNextParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { createRoute as createTanstackRoute } from "@tanstack/react-router";

import type { Assign, IsAny } from "./types";

// type TrailingSlashOption = "always" | "never" | "preserve";

// export const createRouter = <
//   TRouteTree extends AnyRoute,
//   TTrailingSlashOption extends TrailingSlashOption,
//   TDehydrated extends Record<string, any> = Record<string, any>,
//   TSerializedError extends Record<string, any> = Record<string, any>,
// >(
//   options: RouterConstructorOptions<
//     TRouteTree,
//     TTrailingSlashOption,
//     TDehydrated,
//     TSerializedError
//   >,
// ): Router<TRouteTree, TTrailingSlashOption, TDehydrated, TSerializedError> => {
//   const x = createTanstackRoute(options);
//   return {
//     ...x,
//     useSearch: () => {
//       return x.sea;
//     },
//   };
// };
export const createRoute = <
  TParentRoute extends RouteConstraints["TParentRoute"] = AnyRoute,
  TPath extends RouteConstraints["TPath"] = "/",
  TFullPath extends RouteConstraints["TFullPath"] = ResolveFullPath<
    TParentRoute,
    TPath
  >,
  TCustomId extends RouteConstraints["TCustomId"] = string,
  TId extends RouteConstraints["TId"] = ResolveId<
    TParentRoute,
    TCustomId,
    TPath
  >,
  TSearchSchemaInput extends RouteConstraints["TSearchSchema"] = {},
  TSearchSchema extends RouteConstraints["TSearchSchema"] = {},
  TSearchSchemaUsed = TSearchSchemaInput extends SearchSchemaInput
    ? Omit<TSearchSchemaInput, keyof SearchSchemaInput>
    : TSearchSchema,
  TFullSearchSchemaInput = ResolveFullSearchSchemaInput<
    TParentRoute,
    TSearchSchemaUsed
  >,
  TFullSearchSchema = ResolveFullSearchSchema<TParentRoute, TSearchSchema>,
  TParams = Record<ParsePathParams<TPath>, string>,
  TAllParams = ResolveAllParams<TParentRoute, TParams>,
  TRouteContextReturn extends RouteConstraints["TRouteContext"] = RouteContext,
  TRouteContext = [TRouteContextReturn] extends [never]
    ? RouteContext
    : TRouteContextReturn,
  TAllContext = Assign<
    IsAny<TParentRoute["types"]["allContext"], {}>,
    TRouteContext
  >,
  TRouterContext extends RouteConstraints["TRouterContext"] = AnyContext,
  TLoaderDeps extends Record<string, any> = {},
  TLoaderDataReturn = unknown,
  TLoaderData = [TLoaderDataReturn] extends [never]
    ? undefined
    : TLoaderDataReturn,
  TChildren extends RouteConstraints["TChildren"] = unknown,
>(
  options: RouteOptions<
    TParentRoute,
    TCustomId,
    TPath,
    TSearchSchemaInput,
    TSearchSchema,
    TSearchSchemaUsed,
    TFullSearchSchemaInput,
    TFullSearchSchema,
    TParams,
    TAllParams,
    TRouteContextReturn,
    TRouteContext,
    TRouterContext,
    TAllContext,
    TLoaderDeps,
    TLoaderDataReturn,
    TLoaderData
  >,
): Route<
  TParentRoute,
  TPath,
  TFullPath,
  TCustomId,
  TId,
  TSearchSchemaInput,
  TSearchSchema,
  TSearchSchemaUsed,
  TFullSearchSchemaInput,
  TFullSearchSchema,
  TParams,
  TAllParams,
  TRouteContextReturn,
  TRouteContext,
  TAllContext,
  TRouterContext,
  TLoaderDeps,
  TLoaderDataReturn,
  TLoaderData,
  TChildren
> => {
  const x = createTanstackRoute<
    TParentRoute,
    TPath,
    TFullPath,
    TCustomId,
    TId,
    TSearchSchemaInput,
    TSearchSchema,
    TSearchSchemaUsed,
    TFullSearchSchemaInput,
    TFullSearchSchema,
    TParams,
    TAllParams,
    TRouteContextReturn,
    TRouteContext,
    TAllContext,
    TRouterContext,
    TLoaderDeps,
    TLoaderDataReturn,
    TLoaderData,
    TChildren
  >(options);
  const useSearch = ((_opts) => {
    const search: Record<string, string | null> = {};
    const s = useSearchParams();
    const getSchema = () => {
      if (options.validateSearch) {
        return options.validateSearch;
      }
      return options.getParentRoute().options.validateSearch;
    };
    const validateSearch = getSchema();
    if (s && validateSearch) {
      Object.entries(validateSearch).forEach(([key]) => {
        search[key] = s.get(key);
      });
      return (validateSearch as unknown as z.AnyZodObject).parse(search);
    }
    return null;
  }) as typeof x.useSearch;

  const useNavigate = () => {
    const router = useRouter();
    const prev = useSearch();
    const navigate: UseNavigateResult<TFullPath> = async (params) => {
      let href = params.to?.toString() ?? "";
      if (typeof params.search === "function") {
        const newSearchParams = new URLSearchParams();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Object.entries(params.search(prev)).forEach(([key, value]) => {
          newSearchParams.set(key, value as string);
        });
        href += "?" + newSearchParams.toString();
      }
      if (href) router.push(href);
    };
    return navigate;
  };

  const useParams = (() => {
    return useNextParams();
  }) as typeof x.useParams;

  return {
    ...x,
    useNavigate,
    useSearch,
    useParams,
  };
};
