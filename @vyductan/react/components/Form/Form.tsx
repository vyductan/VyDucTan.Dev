'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsm, type FormErrors, type FormLayout } from '@vyductan/react'
import { type FormHTMLAttributes, useEffect } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { type ZodObject } from 'zod'

import { FormProvider } from './context'
import { FormItem } from './FormItem'

export type FormProps<Values extends FieldValues = FieldValues> =
  FormHTMLAttributes<HTMLFormElement> & {
    errors?: FormErrors<Values>
    layout?: FormLayout
    schema?: ZodObject<Values>
    onFinish: (values: Values) => Promise<void>
  }
const FormComponent = <Values extends FieldValues = FieldValues>({
  children,
  errors,
  layout,
  schema,
  onFinish,

  ...rest
}: FormProps<Values>) => {
  const methods = useForm<Values>({
    resolver: schema && zodResolver(schema),
  })
  const { handleSubmit, setError } = methods

  useEffect(() => {
    errors?.forEach(({ field, type, message }) => {
      setError(field, { type, message })
    })
  }, [errors, setError])

  return (
    <FormProvider<Values>
      value={{
        layout,
        schema,
        ...methods,
      }}
    >
      <form
        className={clsm('mb-md')}
        onSubmit={(...args) =>
          void handleSubmit(async (values, event) => {
            event?.stopPropagation()
            event?.preventDefault()
            await onFinish?.(values)
          })(...args)
        }
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  )
}
export const Form = Object.assign(FormComponent, {
  Item: FormItem,
})
