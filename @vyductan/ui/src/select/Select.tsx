"use client";

import React from "react";

import type { ValueType } from "../form";
import type { SelectRootProps } from "./components";
import type { Option } from "./types";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "./components";

export const selectDefaultPlaceholder = "Select an option";

export type SelectProps<T extends ValueType = string> = Omit<
  SelectRootProps,
  "value" | "onValueChange"
> & {
  value?: T;
  options: Option<T>[];

  loading?: boolean;
  empty?: React.ReactNode;
  placeholder?: string;

  onSearchChange?: (search: string) => void;

  groupClassName?: string;
  optionRender?: (option: Option<T>) => {
    checked?: boolean;
    icon?: React.ReactNode;
    label?: React.ReactNode;
  };
  optionsRender?: (options: Option<T>[]) => React.ReactNode;
} & {
  onChange?: (value: T, option: Option | Array<Option>) => void;
};

const SelectInner = <T extends ValueType = string>(
  {
    value,
    options,

    placeholder,

    onChange,

    ...props
  }: SelectProps<T>,
  _: React.ForwardedRef<HTMLInputElement>,
) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectRoot
      value={value as string}
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => {
        const x = options.find((x) => String(x.value) === String(value))?.value;
        onChange?.(x!, options.find((x) => x.value === value) as Option);
      }}
      {...props}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={String(o.value)} value={o.value as string}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export const Select = React.forwardRef(SelectInner) as <T extends ValueType>(
  props: SelectProps<T> & {
    ref?: React.ForwardedRef<HTMLUListElement>;
  },
) => ReturnType<typeof SelectInner>;
