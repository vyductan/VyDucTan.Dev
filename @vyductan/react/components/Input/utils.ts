import { clsm, type InputProps } from '@vyductan/react'

export const getInputCls = (size?: InputProps['size']) =>
  clsm(
    'rounded-lg border-gray-300 shadow-sm',
    'focus:border-brand-600 focus:ring focus:ring-brand-200 focus:ring-opacity-50',
    'text-base py-1 px-3',
    size === 'small' && 'text-base py-0 px-2',
    size === 'large' && 'text-md py-[7px] px-3'
  )
