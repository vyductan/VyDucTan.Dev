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
    'rounded-base py-1.5 border-gray-300',
    'hover:border-primary-500',
    'focus:ring-primary-100 focus:border-primary-500',
    'text-gray-900 placeholder:text-gray-400',
    'sm:text-sm sm:leading-6',
    size === 'small' && 'py-0 px-2',
    size === 'large' && 'text-md py-[7px] px-3'
  )

export const getValidateStatus = (validateStatus?: FormItemValidateStatus) =>
  clsm(
    // validateStatus === 'error' && 'ring-error focus:ring-2'
    validateStatus === 'error' &&
      'border-red-500 hover:border-red-300 focus:ring-red-100 focus:border-red-500'
  )
