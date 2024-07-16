/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type {
  AllParams,
  AnyContext,
  AnyRoute,
  AnyRouter,
  FullSearchSchema,
  LazyRoute,
  ParsePathParams,
  ParseRoute,
  RegisteredRouter,
  ResolveAllParams,
  ResolveFullPath,
  ResolveFullSearchSchema,
  ResolveFullSearchSchemaInput,
  ResolveId,
  RouteById,
  RouteConstraints,
  RouteContext,
  RouteLoaderFn,
  RouteMatch,
  RouteOptions,
  SearchSchemaInput,
  TrimPathRight,
  UpdatableRouteOptions,
  UseNavigateResult,
} from "@tanstack/react-router";

export type Assign<TLeft, TRight> = keyof TLeft extends never
  ? TRight
  : keyof TRight extends never
    ? TLeft
    : Omit<TLeft, keyof TRight> & TRight;
export type IsAny<TValue, TYesResult, TNoResult = TValue> = 1 extends 0 & TValue
  ? TYesResult
  : TNoResult;
export type Expand<T> = T extends object
  ? T extends infer O
    ? O extends Function
      ? O
      : {
          [K in keyof O]: O[K];
        }
    : never
  : T;

export type MakeRouteMatch<
  TRouteTree extends AnyRoute = RegisteredRouter["routeTree"],
  TRouteId = ParseRoute<TRouteTree>["id"],
  TReturnIntersection extends boolean = false,
  TTypes extends AnyRoute["types"] = RouteById<TRouteTree, TRouteId>["types"],
  TAllParams = TReturnIntersection extends false
    ? TTypes["allParams"]
    : Partial<AllParams<TRouteTree>>,
  TFullSearchSchema = TReturnIntersection extends false
    ? TTypes["fullSearchSchema"]
    : Partial<FullSearchSchema<TRouteTree>>,
  TLoaderData = TTypes["loaderData"],
  TAllContext = TTypes["allContext"],
  TRouteContext = TTypes["routeContext"],
  TLoaderDeps = TTypes["loaderDeps"],
> = RouteMatch<
  TRouteId,
  TAllParams,
  TFullSearchSchema,
  TLoaderData,
  TAllContext,
  TRouteContext,
  TLoaderDeps
>;

export declare class Route<
  in out TParentRoute extends RouteConstraints["TParentRoute"] = AnyRoute,
  in out TPath extends RouteConstraints["TPath"] = "/",
  in out TFullPath extends RouteConstraints["TFullPath"] = ResolveFullPath<
    TParentRoute,
    TPath
  >,
  in out TCustomId extends RouteConstraints["TCustomId"] = string,
  in out TId extends RouteConstraints["TId"] = ResolveId<
    TParentRoute,
    TCustomId,
    TPath
  >,
  in out TSearchSchemaInput extends RouteConstraints["TSearchSchema"] = {},
  in out TSearchSchema extends RouteConstraints["TSearchSchema"] = {},
  in out TSearchSchemaUsed = TSearchSchemaInput extends SearchSchemaInput
    ? Omit<TSearchSchemaInput, keyof SearchSchemaInput>
    : TSearchSchema,
  in out TFullSearchSchemaInput = ResolveFullSearchSchemaInput<
    TParentRoute,
    TSearchSchemaUsed
  >,
  in out TFullSearchSchema = ResolveFullSearchSchema<
    TParentRoute,
    TSearchSchema
  >,
  in out TParams = Record<ParsePathParams<TPath>, string>,
  in out TAllParams = ResolveAllParams<TParentRoute, TParams>,
  TRouteContextReturn extends RouteConstraints["TRouteContext"] = RouteContext,
  in out TRouteContext = [TRouteContextReturn] extends [never]
    ? RouteContext
    : TRouteContextReturn,
  in out TAllContext = Assign<
    IsAny<TParentRoute["types"]["allContext"], {}>,
    TRouteContext
  >,
  in out TRouterContext extends RouteConstraints["TRouterContext"] = AnyContext,
  in out TLoaderDeps extends Record<string, any> = {},
  TLoaderDataReturn = unknown,
  in out TLoaderData = [TLoaderDataReturn] extends [never]
    ? undefined
    : TLoaderDataReturn,
  in out TChildren extends RouteConstraints["TChildren"] = unknown,
> {
  isRoot: TParentRoute extends Route<any> ? true : false;
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
  >;
  parentRoute: TParentRoute;
  id: TId;
  path: TPath;
  fullPath: TFullPath;
  to: TrimPathRight<TFullPath>;
  children?: TChildren;
  originalIndex?: number;
  router?: AnyRouter;
  rank: number;
  lazyFn?: () => Promise<LazyRoute<any>>;
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(
    options?: RouteOptions<
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
  );
  types: {
    parentRoute: TParentRoute;
    path: TPath;
    to: TrimPathRight<TFullPath>;
    fullPath: TFullPath;
    customId: TCustomId;
    id: TId;
    searchSchema: TSearchSchema;
    searchSchemaInput: TSearchSchemaInput;
    searchSchemaUsed: TSearchSchemaUsed;
    fullSearchSchema: TFullSearchSchema;
    fullSearchSchemaInput: TFullSearchSchemaInput;
    params: TParams;
    allParams: TAllParams;
    routeContext: TRouteContext;
    allContext: TAllContext;
    children: TChildren;
    routerContext: TRouterContext;
    loaderData: TLoaderData;
    loaderDeps: TLoaderDeps;
  };
  init: (opts: { originalIndex: number }) => void;
  addChildren: <const TNewChildren extends readonly AnyRoute[]>(
    children: TNewChildren,
  ) => Route<
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
    TNewChildren
  >;
  updateLoader: <TNewLoaderData = unknown>(options: {
    loader: RouteLoaderFn<
      TAllParams,
      TLoaderDeps,
      TAllContext,
      TRouteContext,
      TNewLoaderData
    >;
  }) => Route<
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
    TNewLoaderData,
    TChildren,
    unknown
  >;
  update: (
    options: UpdatableRouteOptions<
      TCustomId,
      TAllParams,
      TFullSearchSchema,
      TLoaderData,
      TAllContext,
      TRouteContext,
      TLoaderDeps
    >,
  ) => this;
  lazy: (lazyFn: () => Promise<LazyRoute<any>>) => this;
  useMatch: <
    TRouteTree extends AnyRoute = any,
    TRouteMatch = MakeRouteMatch<TRouteTree, TId>,
    TSelected = TRouteMatch,
  >(
    opts?:
      | {
          select?: ((match: TRouteMatch) => TSelected) | undefined;
        }
      | undefined,
  ) => TSelected;
  useRouteContext: <TSelected = Expand<TAllContext>>(
    opts?:
      | {
          select?: ((search: Expand<TAllContext>) => TSelected) | undefined;
        }
      | undefined,
  ) => TSelected;
  useSearch: <TSelected = Expand<TFullSearchSchema>>(
    opts?:
      | {
          select?:
            | ((search: Expand<TFullSearchSchema>) => TSelected)
            | undefined;
        }
      | undefined,
  ) => TSelected;
  useParams: <TSelected = Expand<TAllParams>>(
    opts?:
      | {
          select?: ((search: Expand<TAllParams>) => TSelected) | undefined;
        }
      | undefined,
  ) => TSelected;
  useLoaderDeps: <TSelected = TLoaderDeps>(
    opts?:
      | {
          select?: ((s: TLoaderDeps) => TSelected) | undefined;
        }
      | undefined,
  ) => TSelected;
  useLoaderData: <TSelected = TLoaderData>(
    opts?:
      | {
          select?: ((search: TLoaderData) => TSelected) | undefined;
        }
      | undefined,
  ) => TSelected;
  useNavigate: () => UseNavigateResult<TFullPath>;
}
