import { AnyObjectSchema, SchemaDescription } from "yup";

import { FieldInitialProps, ModelFields } from "./types";

// type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
//   [Property in Key]-?: Type[Property];
// };
// type FieldsMap<T extends string | number | symbol> = Record<T, FieldInitialProps<T>>;
// type FieldsWithNameMap<T extends string | number | symbol> = Record<
//   T,
//   WithRequiredProperty<FieldInitialProps<T>, "name">
// >;

// export const createFieldsMap = <
//   T extends Record<string, unknown>,
//   TModel extends AnyObjectSchema = AnyObjectSchema
// >(
//   m: FieldsMap<keyof T>,
//   model?: TModel
// ) => {
//   return Object.entries(m).reduce(
//     (p, [key, { selectProps, ...restProps }]) => ({
//       ...p,
//       [key]: {
//         name: key,
//         required: model
//           ? !(model.fields[key].describe() as SchemaDescription).optional
//           : restProps.required,
//         ...selectProps,
//         ...restProps,
//       },
//     }),
//     {} as FieldsWithNameMap<keyof T>
//   );
// };

export const createFieldsMap = <
  TFields extends ModelFields<Record<string, unknown>>,
>(
  fields: TFields,
  model?: AnyObjectSchema,
) => {
  return Object.entries(fields).reduce(
    (p, [key, { ...restProps }]) => ({
      ...p,
      [key]: {
        required: model
          ? !(model.fields[key].describe() as SchemaDescription).optional
          : restProps.required,
        ...restProps,
      },
    }),
    {} as typeof fields,
  );
};
