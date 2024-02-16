"use client"

import { forwardRef, Ref, useEffect, type FormHTMLAttributes } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type FieldValues } from "react-hook-form"
import { z, type ZodObject } from "zod"

import { ServerAction, useServerAction } from "@vyductan/server-action"

import clsm from "../_util/clsm"
import { SizeType } from "../config-provider"
import { FormProvider } from "./context"
import { FormInstance, FormLayout } from "./types"

// import { useForm as useFormInternal } from './useForm'

export type FormProps<
  Values extends FieldValues,
  TResponse,
> = FormHTMLAttributes<HTMLFormElement> & {
  form?: FormInstance
  layout?: FormLayout
  size?: SizeType

  schema?: ZodObject<Values>
  serverAction?: ServerAction<z.ZodTypeAny, TResponse>
  onFinish?: (values: Values) => Promise<void>
  onSucces?: (response: TResponse) => void
}
const Form = forwardRef(function Form<Values extends FieldValues, TResponse>(
  {
    form,
    children,
    className,
    // errors,
    layout = "vertical",
    schema,
    serverAction,
    onFinish,
    onSucces,
    ...rest
  }: FormProps<Values, TResponse>,
  ref: Ref<HTMLFormElement>,
) {
  // react-hook-form
  const methods = useForm<Values>({
    resolver: schema && zodResolver(schema),
  })
  const { handleSubmit, setError } = methods

  // server action
  const { loading, mutate, formErrors } = useServerAction<Values>(
    serverAction,
    {
      manual: true,
    },
  )

  // useEffect(() => {
  //   errors?.forEach(({ field, type, message }) => {
  //     setError(field, { type, message })
  //   })
  // }, [errors, setError])
  useEffect(() => {
    formErrors?.forEach(({ field, type, message }) => {
      setError(field, { type, message })
    })
  }, [formErrors, setError])

  return (
    <FormProvider
      value={{
        layout,
        loading,
        schema,
        ...methods,
      }}
    >
      <form
        ref={ref}
        className={clsm(className)}
        onSubmit={(...args) =>
          void handleSubmit(async (values, event) => {
            event?.stopPropagation()
            event?.preventDefault()
            console.log("submit", values, args)
            await onFinish?.(values)
            if (serverAction) {
              form?.setSubmitting(true)
              const { data, success } = await mutate(values)
              form?.setSubmitting(false)
              if (success && onSucces) {
                onSucces(data)
              }
            }
          })(...args)
        }
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  )
}) as <Values extends FieldValues, TResponse>(
  props: FormProps<Values, TResponse> & { ref?: Ref<HTMLFormElement> },
) => JSX.Element
// if (process.env.NODE_ENV !== 'production') {
//   FormInternal.displayName = 'Button'
// }
export default Form
