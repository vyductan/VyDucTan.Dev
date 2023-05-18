import { clsm } from '@vyductan/react'
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode
    href?: string
    type?: 'primary'
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    size?: 'small' | 'default' | 'large'
  }
export const Button = ({
  href,
  children,
  className,
  type,
  htmlType,
  size,
  ...rest
}: ButtonProps) => {
  const cls = clsm(
    'inline-flex items-center font-medium rounded-base text-sm text-center',
    'transition-all duration-200',
    type === 'primary' && 'text-white bg-primary-600 hover:bg-primary-500',
    'h-base py-1 px-3 text-sm',
    size === 'small' && 'h-sm py-0 px-2',
    size === 'large' && 'h-lg py-2 px-4 text-md',
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
      {...rest}
      className={cls}
      type={htmlType}
    >
      {children}
    </button>
  )
}
