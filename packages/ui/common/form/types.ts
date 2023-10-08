import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  UseFormRegisterReturn,
  type FieldError,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { FieldSelectProps, SelectOptionType } from "./FieldSelect";

export type FormErrors<TFieldValues extends FieldValues = FieldValues> = Array<
  FieldError & {
    field: FieldPath<TFieldValues>;
  }
>;

export type FormLayout = "horizontal" | "vertical";

export type FormItemValidateStatus =
  | "success"
  | "warning"
  | "error"
  | "validating";
export type FormItemChildProps = Partial<UseFormRegisterReturn> & {
  validateStatus?: FormItemValidateStatus;
};

export type FormInstance = {
  submitting: boolean;
  setSubmitting: Dispatch<SetStateAction<boolean>>;
};

export type ValueType = string;

export type FieldBaseProps = {
  disabled?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
};

//
// ***************** TEMP
//
// export type FieldInitialProps<Key extends string | number | symbol = string> =
//   FieldBaseProps<Key> & {
//     name: Key;
//     selectProps?: FieldSelectProps;
//     render?: (value?: ValueType) => ReactNode;
//   };
//
// // export type ModelFields<TType extends Record<keyof TType, unknown> = Record<keyof TType, unknown>> =
// //   Record<keyof TType, FieldInitialProps<keyof TType>>;
// export type ModelFields<TKeys extends string> = Record<TKeys, FieldInitialProps<TKeys>>;

export type FieldInitialProps<TType extends Record<string, unknown>> =
  FieldBaseProps & {
    name: keyof TType;
    selectProps?: Omit<FieldSelectProps, "options"> & {
      options:
        | Array<SelectOptionType>
        | ((record: TType) => Array<SelectOptionType>);
    };
    render?: (record: TType) => ReactNode;
  };

// export type ModelFields<TType extends Record<keyof TType, unknown> = Record<keyof TType, unknown>> =
//   Record<keyof TType, FieldInitialProps<keyof TType>>;
export type ModelFields<TType extends Record<string, unknown>> = Record<
  keyof TType,
  FieldInitialProps<TType>
>;

// export type FieldInitialProps<TType extends Record<string, unknown> | string> = FieldBaseProps<
//   keyof TType
// > & {
//   name: TType extends Record<string, unknown> ? keyof TType : TType;
//   selectProps?: Omit<FieldSelectProps, "options"> & {
//     options: Array<SelectOptionType> | ((record: TType) => Array<SelectOptionType>);
//   };
//   render?: (record: TType) => ReactNode;
// };
//
// // export type ModelFields<TType extends Record<keyof TType, unknown> = Record<keyof TType, unknown>> =
// //   Record<keyof TType, FieldInitialProps<keyof TType>>;
// export type ModelFields<TType extends Record<string, unknown> | string> = Record<
//   TType extends Record<string, unknown> ? keyof TType : TType,
//   FieldInitialProps<TType>
// >;
