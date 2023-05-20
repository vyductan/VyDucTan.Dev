import { clsm } from '@vyductan/react'
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

import { type ComponentSize } from '../types'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'primary'
  size?: ComponentSize
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>

export const Button = ({
  href,
  children,
  className,
  variant,
  size = 'md',
  ...rest
}: ButtonProps) => {
  const cls = clsm(
    'inline-flex items-center rounded-base text-center font-semibold',
    // 'transition-all duration-200',
    '[transition:all_.2s,box-shadow_0s]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    'active:ring-2 active:ring-gray-200',
    variant === 'primary' &&
      'bg-primary-600 text-white hover:bg-primary-500 active:ring-primary-200',
    size === 'sm' && 'h-sm px-2 py-0',
    size === 'md' && 'h-md px-3 py-2 text-sm',
    size === 'lg' && 'h-lg px-4 py-2 text-lg',
    size === 'xl' && 'h-xl px-4 text-xl',
    className
  )

  if (href) {
    return (
      <a
        {...rest}
        href={href}
        className={cls}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={cls}
      {...rest}
    >
      {children}
    </button>
  )
}
