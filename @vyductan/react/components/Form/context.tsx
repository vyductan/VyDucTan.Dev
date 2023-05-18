import { createContext, type ReactNode, useContext } from 'react'
import { type FieldValues, type UseFormReturn } from 'react-hook-form'
import { type ZodObject } from 'zod'

import { type FormLayout } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormContextType<TFieldValues extends FieldValues = any> =
  UseFormReturn<TFieldValues> & {
    layout?: FormLayout
    schema?: ZodObject<TFieldValues>
  }
const FormContext = createContext<FormContextType | null>(null)

export const useForm = <
  TFieldValues extends FieldValues
>(): FormContextType<TFieldValues> => {
  return useContext(FormContext) as FormContextType<TFieldValues>
}

export type FormProviderProps<TFieldValues extends FieldValues = FieldValues> =
  {
    children: ReactNode
    value: FormContextType<TFieldValues>
  }
export const FormProvider = <TFieldValues extends FieldValues>({
  children,
  value,
}: FormProviderProps<TFieldValues>) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
