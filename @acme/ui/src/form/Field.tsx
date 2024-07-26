"use client";

import type { ForwardedRef, ReactElement, ReactNode } from "react";
import type {
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
  UseFormStateReturn,
} from "react-hook-form";
import { cloneElement, forwardRef, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, useFormContext } from "react-hook-form";

import { clsm } from "..";
import { FormFieldContext } from "./context";
import { FieldDescription } from "./FieldDescription";
import { FieldLabel } from "./FieldLabel";
import { FieldMessage } from "./FieldMessage";

type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render" | "name"> & {
  // Required<Pick<ControllerProps<TFieldValues, TName>, "control">> & {
  children?:
    | ReactElement
    | (({
        field,
        fieldState,
        formState,
      }: {
        field: FieldControllerRenderProps<TFieldValues, TName>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<TFieldValues>;
      }) => React.ReactElement);
  name?: TName;
  label?: string | JSX.Element;
  description?: ReactNode;
  className?: string;
};
const FieldInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  {
    // control,
    name,
    children,
    // label,
    // description,
    // children,
    // className,
    ...props
  }: FieldProps<TFieldValues, TName>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const id = useId();
  const fieldId = `${id}-form-item`;
  const fieldDescriptionId = `${id}-form-item-description`;
  const fieldMessageId = `${id}-form-item-message`;

  const form =
    useFormContext<TFieldValues>() as UseFormReturn<TFieldValues> | null;

  if (form && name) {
    return (
      <FormFieldContext.Provider
        value={{
          name,
          id,
          fieldId,
          fieldDescriptionId,
          fieldMessageId,
        }}
      >
        <Controller
          control={form.control}
          name={name}
          //{...props}
          render={({ field, fieldState, formState }) => (
            <FieldRender
              fieldId={fieldId}
              fieldMessageId={fieldMessageId}
              fieldDescriptionId={fieldDescriptionId}
              children={
                children
                  ? typeof children === "function"
                    ? children({
                        field,
                        fieldState,
                        formState,
                      })
                    : cloneElement(children, {
                        ...field,
                        value: field.value || "",
                        onChange: (e) => {
                          children.props.onChange?.(e);
                          field.onChange(e);
                        },
                      })
                  : null
              }
              ref={ref}
              {...props}
            />
          )}
        />
      </FormFieldContext.Provider>
    );
  }
  if (name && typeof children !== "function") {
    return (
      <FormFieldContext.Provider
        value={{
          name,
          id,
          fieldId,
          fieldDescriptionId,
          fieldMessageId,
        }}
      >
        <FieldRender
          fieldId={fieldId}
          fieldMessageId={fieldMessageId}
          fieldDescriptionId={fieldDescriptionId}
          children={children}
          ref={ref}
          {...props}
        />
      </FormFieldContext.Provider>
    );
  }

  if (typeof children !== "function") {
    return <FieldRender children={children} />;
  }
  return null;
};

type FormItemRenderProps = {
  className?: string;

  label?: string | JSX.Element;
  description?: ReactNode;
  error?: string;
  children?: ReactElement | null;

  fieldId?: string;
  fieldDescriptionId?: string;
  fieldMessageId?: string;
};
const FieldRender = forwardRef<HTMLDivElement, FormItemRenderProps>(
  (
    {
      className,
      label,
      description,
      error,
      children,

      fieldId,
      fieldDescriptionId,
      fieldMessageId,

      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={clsm("space-y-2", "mb-6", className)}
        ref={ref}
        {...props}
      >
        {!fieldId && children ? (
          children
        ) : (
          <>
            {/* Label */}
            {label ? (
              typeof label === "string" ? (
                <FormLabel>{label}</FormLabel>
              ) : (
                label
              )
            ) : null}

            {/* Input */}
            <Slot
              id={fieldId}
              aria-describedby={
                !error
                  ? `${fieldDescriptionId}`
                  : `${fieldDescriptionId} ${fieldMessageId}`
              }
              aria-invalid={!!error}
            >
              {children}
              {/* {children */}
              {/*   ? typeof children === "function" */}
              {/*     ? children() */}
              {/*     : cloneElement(children) */}
              {/*   : null} */}
              {/* {children */}
              {/*   ? typeof children === "function" */}
              {/*     ? children({ */}
              {/*         field, */}
              {/*         fieldState, */}
              {/*         formState, */}
              {/*       }) */}
              {/*     : cloneElement(children, field) */}
              {/*   : null} */}
            </Slot>

            {/* Description */}
            {description && <FieldDescription>{description}</FieldDescription>}

            {/* Message */}
            <FieldMessage />
          </>
        )}
      </div>
    );
  },
);

type FieldControllerRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerRenderProps<TFieldValues, TName>;

const Field = forwardRef(FieldInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormItemProps<TFieldValues, TName>,
) => ReturnType<typeof FieldInner>;

export { Field };
