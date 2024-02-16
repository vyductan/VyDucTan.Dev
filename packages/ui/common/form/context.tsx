import { createContext, useContext, type ReactNode } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { type ZodObject } from "zod";

import { type FormLayout } from "./types";

type FormContextType<TFieldValues extends FieldValues = any> =
  UseFormReturn<TFieldValues> & {
    layout?: FormLayout;
    loading?: boolean;
    schema?: ZodObject<TFieldValues>;
    submit?: () => void;
  };
const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = <
  TFieldValues extends FieldValues,
>(): FormContextType<TFieldValues> => {
  return useContext(FormContext) as FormContextType<TFieldValues>;
};

export type FormProviderProps<TFieldValues extends FieldValues = FieldValues> =
  {
    children: ReactNode;
    value: FormContextType<TFieldValues>;
  };
export const FormProvider = <TFieldValues extends FieldValues>({
  children,
  value,
}: FormProviderProps<TFieldValues>) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
