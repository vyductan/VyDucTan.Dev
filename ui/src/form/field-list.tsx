"use client";

import type { ReactElement } from "react";
import type {
  Control,
  FieldArrayPath,
  FieldValues,
  UseFieldArrayReturn,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { Field } from "./field";

type FieldListProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> = {
  control?: Control<TFieldValues>;
  name: TFieldArrayName;
  label?: string;
  description?: string;
  children?: (
    ctx: Omit<
      UseFieldArrayReturn<TFieldValues, TFieldArrayName, "id">,
      "fields"
    > & {
      fields: {
        id: string;
        name: string;
      }[];
    },
  ) => ReactElement;
};
const FieldList = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  children,
}: FieldListProps<TFieldValues, TFieldArrayName>) => {
  const { fields: defaultValues, ...helper } = useFieldArray<
    TFieldValues,
    TFieldArrayName
  >({
    control,
    name,
  });
  const fields = defaultValues.map((value, index) => {
    return {
      id: value.id,
      name: `${name}.${index}`,
    };
  });
  const ctx = {
    fields,
    ...helper,
  };
  return (
    <Field label={label} name={name} description={description}>
      {children?.(ctx)}
    </Field>
  );
};

export { FieldList };
export type { FieldListProps as FieldArrayProps };
