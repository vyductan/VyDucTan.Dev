/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Children, cloneElement, isValidElement, useEffect } from "react";
import { Form as AntdForm } from "antd";
import { useController } from "react-hook-form";

type AntdFormItemProps = React.ComponentProps<typeof AntdForm.Item>;

export type FormItemProps<TFieldValues extends FieldValues = FieldValues> = {
  children: React.ReactNode;
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  disabled?: boolean;
  overrideFieldOnChange?: (...values: any[]) => void;
} & Omit<AntdFormItemProps, "name" | "rules" | "validateStatus">;

// TODO: Support `onBlur` `ref` `reset`
export const FormItem = <TFieldValues extends FieldValues = FieldValues>({
  children,
  control,
  name,
  disabled,
  help,
  valuePropName,
  overrideFieldOnChange,
  ...props
}: FormItemProps<TFieldValues>) => {
  const { field, fieldState } = useController({ name, control, disabled });
  const form = AntdForm.useFormInstance();

  useEffect(() => {
    form.setFieldValue(name, field.value);
  }, [field.value]);

  return (
    <AntdForm.Item
      {...props}
      //@ts-expect-error Ant Design form item name type safe is not necessary here
      name={name}
      initialValue={field.value}
      validateStatus={fieldState.invalid ? "error" : undefined}
      help={fieldState.error?.message ?? help}
      // help={t(fieldState.error?.message) ?? help}
    >
      {Children.map(
        children,
        (child) =>
          isValidElement(child) &&
          cloneElement(child, {
            ...field,
            //@ts-expect-error onChange type safe is not necessary here
            onChange: (...params) => {
              child.props.onChange?.(...params);
              overrideFieldOnChange
                ? overrideFieldOnChange(...params)
                : field.onChange(...params);
            },
            onBlur: () => {
              child.props.onBlur?.();
              field.onBlur();
            },
            ...(valuePropName && {
              [valuePropName]: field.value,
            }),
          }),
      )}
    </AntdForm.Item>
  );
};
