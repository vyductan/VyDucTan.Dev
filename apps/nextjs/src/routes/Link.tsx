import type {
  AnyRouter,
  LinkProps,
  RegisteredRouter,
  RoutePaths,
} from "@tanstack/react-router";
import NextLink from "next/link";

type LinkComponentProps<TComp> = React.PropsWithoutRef<
  TComp extends React.FC<infer TProps> | React.Component<infer TProps>
    ? TProps
    : TComp extends keyof JSX.IntrinsicElements
      ? Omit<React.HTMLProps<TComp>, "children" | "preload">
      : never
> &
  React.RefAttributes<
    TComp extends
      | React.FC<{
          ref: infer TRef;
        }>
      | React.Component<{
          ref: infer TRef;
        }>
      ? TRef
      : TComp extends keyof JSX.IntrinsicElements
        ? React.ComponentRef<TComp>
        : never
  >;

export const Link = <
  TRouter extends AnyRouter = RegisteredRouter,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  TFrom extends RoutePaths<TRouter["routeTree"]> | string = string,
  TTo extends string = "",
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  TMaskFrom extends RoutePaths<TRouter["routeTree"]> | string = TFrom,
  TMaskTo extends string = "",
>({
  to,
  params,
  children,

  className,
  // ...rest
}: LinkProps<TRouter, TFrom, TTo, TMaskFrom, TMaskTo> &
  LinkComponentProps<"a">) => {
  let href = to as string;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      href = href.replace(`$${key}`, value as string);
    });
  }
  return (
    <NextLink href={href} className={className}>
      {typeof children === "function"
        ? children({ isActive: false, isTransitioning: false })
        : children}
    </NextLink>
  );
};
