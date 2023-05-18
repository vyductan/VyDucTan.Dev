'use client'

import { useMemo, useRef, useState } from 'react'
import { type FieldValues } from 'react-hook-form'
import { type z, type ZodIssueBase } from 'zod'

import { type FormErrors } from '../components/Form'
import { type ServerAction } from './createServerAction'

type FieldError = Omit<ZodIssueBase, 'path'> & {
  field: ZodIssueBase['path']
}
type ServerActionError = string | FieldError[]
export function useServerAction<TInput extends z.ZodTypeAny, TResponse>(
  action: ServerAction<TInput, TResponse>
) {
  const doAction = useRef(action)

  const [data, setData] = useState<TResponse | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ServerActionError | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors<TInput>>([])

  const mutate = useMemo(
    () => async (input: z.infer<TInput> | FieldValues) => {
      setLoading(true)
      setError(null)
      setData(null)
      try {
        const result = await doAction.current(input)
        setData(result)
        setLoading(false)
      } catch (e) {
        if (e instanceof Error) {
          const message = JSON.parse(e.message) as unknown
          if (typeof message === 'string') {
            setError(message)
          } else if (Array.isArray(message) && message.length > 0) {
            const first = message[0] as unknown
            if (first instanceof Object && first.hasOwnProperty('field')) {
              setFormErrors(message)
            }
          }
        }
        // console.log('ssssssssss', e instanceof ZodError)
        // if (e instanceof z.ZodError) {
        //   console.log('?????', e)
        //   setError(
        //     e.issues.map(({ path, message }) => ({
        //       field: path,
        //       message: message,
        //     }))
        //   )
        // } else if (e instanceof Error) {
        //   console.log('mmmmmmmmm', e.name, e.message, 'x', e.cause, e.stack)
        //   setError(e.message)
        // }
        setLoading(false)
      }
    },
    []
  )

  return {
    mutate,
    data,
    loading,
    error,
    formErrors,
  }
}
