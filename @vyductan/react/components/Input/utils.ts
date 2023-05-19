import {
  clsm,
  type FormItemValidateStatus,
  type InputProps,
} from '@vyductan/react'

export const getInputCls = (size?: InputProps['size']) =>
  clsm(
    // 'rounded-base border-0 ring-1 py-1.5 shadow-sm ring-inset ring-gray-300',
    // 'hover:ring-1 hover:ring-inset hover:ring-primary-600',
    // 'focus:ring-2 focus:ring-inset focus:ring-primary-600',
    'rounded-base border-gray-300 py-1.5',
    'hover:border-primary-500',
    // 'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
    'focus:border-primary-500 focus:ring-primary-500',
    'text-gray-900 placeholder:text-gray-400',
    'leading-6',
    size === 'sm' && 'px-2 py-0',
    size === 'md' && 'px-2 py-1.5',
    size === 'lg' && 'px-3 py-[7px] text-lg',
    size === 'xl' && 'px-4 py-[9px] text-xl'
  )

export const getValidateStatus = (validateStatus?: FormItemValidateStatus) =>
  clsm(
    // validateStatus === 'error' && 'ring-error focus:ring-2'
    validateStatus === 'error' &&
      'border-red-500 hover:border-red-300 focus:border-red-500 focus:ring-red-100'
  )
