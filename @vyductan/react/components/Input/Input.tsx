import { clsm, getInputCls } from '@vyductan/react'
import { type InputHTMLAttributes } from 'react'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'small' | 'default' | 'large'
}
export const Input = ({ className, size, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      className={clsm(
        'form-input',
        '[transition:all_.2s]',
        getInputCls(size),
        className
      )}
    />
  )
}
