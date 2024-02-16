"use client";

import { Fragment, type ElementType, type ReactNode, type Ref } from "react";
import {
  Listbox as HeadlessUIListBox,
  Transition,
  type ListboxProps as HeadlessUIListBoxProps,
  type ListboxButtonProps,
} from "@headlessui/react";
import { clsm } from "@vyductan/react";

type OptionRenderArg = {
  active: boolean;
  selected: boolean;
  disabled: boolean;
};
type ListboxOptions = Array<{
  value: string;
  label: ReactNode;
  addonBefore?: ReactNode | ((arg: OptionRenderArg) => ReactNode);
  addonAfter?: ReactNode;
}>;

const DEFAULT_LISTBOX_TAG = Fragment;
type ListboxProps<TTag extends ElementType, TType, TActualType> = Pick<
  HeadlessUIListBoxProps<TTag, TType, TActualType>,
  "as"
> & {
  children: ListboxButtonProps<TTag>["children"];
  options?: ListboxOptions | ReactNode;
};

const ListboxRoot = <
  TTag extends ElementType = typeof DEFAULT_LISTBOX_TAG,
  TType = string,
  TActualType = TType extends (infer U)[] ? U : TType,
>(
  { children, options, ...rest }: ListboxProps<TTag, TType, TActualType>,
  ref: Ref<HTMLElement>,
) => {
  return (
    <HeadlessUIListBox
      ref={ref}
      {...rest}
    >
      <div className="relative flex flex-col justify-center">
        {children}
        <Transition
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          {Array.isArray(options) ? (
            <HeadlessUIListBox.Options
              className={clsm(
                "rounded-base absolute z-50 overflow-hidden bg-white py-1 font-semibold shadow-lg ring-1 ring-slate-900/10",
                "dark:ring-0, dark:highlight-white/5 dark:bg-slate-800",
              )}
            >
              {options.map((option) => (
                <HeadlessUIListBox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active, selected }) =>
                    clsm(
                      "flex cursor-pointer items-center px-2 py-1 text-sm font-semibold",
                      active ? "bg-slate-100 dark:bg-slate-600/30" : "",
                      selected ? "text-primary-500" : "",
                    )
                  }
                >
                  {(arg) => (
                    <>
                      {option.addonBefore ? (
                        <span className="mr-2">
                          {typeof option.addonBefore === "function"
                            ? option.addonBefore(arg)
                            : option.addonBefore}
                        </span>
                      ) : null}
                      {option.label}
                      {option.addonAfter ? option.addonAfter : null}
                    </>
                  )}
                </HeadlessUIListBox.Option>
              ))}
            </HeadlessUIListBox.Options>
          ) : (
            options
          )}
        </Transition>
      </div>
    </HeadlessUIListBox>
  );
};

export const Listbox = Object.assign(ListboxRoot, {
  Button: HeadlessUIListBox.Button,
  Option: HeadlessUIListBox.Option,
  Options: HeadlessUIListBox.Options,
});
