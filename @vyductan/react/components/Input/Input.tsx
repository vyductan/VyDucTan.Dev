import {
  clsm,
  type FormItemChildProps,
  getInputCls,
  getValidateStatus,
} from '@vyductan/react'
import { forwardRef, type InputHTMLAttributes, type Ref } from 'react'

import { type ComponentSize } from '../types'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  FormItemChildProps & {
    size?: ComponentSize
  }
export const InputInternal = (
  { className, size, type = 'text', validateStatus, ...rest }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <input
      ref={ref}
      className={clsm(
        '[transition:all_.2s]',
        getInputCls(size),
        getValidateStatus(validateStatus),
        className
      )}
      type={type}
      {...rest}
    />
  )
}

export const Input = forwardRef(InputInternal)
