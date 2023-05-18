import { clsm, type FormItemChildProps } from '@vyductan/react'
import { cloneElement, type ReactElement } from 'react'
import { ZodType } from 'zod'

import { useForm } from './context'

export type FormItemProps = {
  children: ReactElement<FormItemChildProps>
  label?: string
  name: string
}
export const FormItem = ({ children, label, name }: FormItemProps) => {
  const { layout, schema, getFieldState, register } = useForm()
  // TODO: mark required use ZodSchema (resolver of react form hook)
  const { error } = getFieldState(name)
  const registerProps = register(name)
  const isRequired =
    schema?.shape[name] instanceof ZodType && !schema.isOptional()

  return (
    <div
      className={clsm(
        'flex',
        !layout || (layout === 'vertical' && 'flex-col'),
        layout === 'horizontal' && 'flex-row',
        !error ? 'mb-md' : ''
      )}
    >
      {label ? (
        <label
          className={clsm(
            'mb-2 text-sm font-medium leading-6',
            isRequired && 'after:ml-0.5 after:text-error after:content-["*"]'
          )}
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <div className='flex flex-col'>
        {cloneElement<FormItemChildProps>(children, {
          ...registerProps,
          validateStatus: error ? 'error' : undefined,
        })}
        {error && (
          <span className='flex h-md flex-nowrap items-center text-error'>
            {error.message}
          </span>
        )}
      </div>
    </div>
  )
}
