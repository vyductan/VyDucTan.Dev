import { Popover as HeadlessUIPopover, Transition } from '@headlessui/react'
import { type Placement } from '@popperjs/core'
import { clsm } from '@vyductan/react'
import {
  type ElementType,
  Fragment,
  type ReactElement,
  type ReactNode,
  useState,
} from 'react'
import { usePopper } from 'react-popper'

import { PopoverProvider, usePopoverContext } from './context'

type PopoverProps = {
  className?: string
  placement?: Placement
  children: ReactNode
}
const PopoverComponent = ({
  className = '',
  placement,
  children,
}: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState<Element | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 12],
        },
      },
    ],
  })

  return (
    <PopoverProvider
      value={{
        setReferenceElement,
        setPopperElement,
        stylesPopper: styles.popper,
        attributesPopper: attributes.popper,
      }}
    >
      <HeadlessUIPopover className={clsm('tw-relative', className)}>
        {children}
      </HeadlessUIPopover>
    </PopoverProvider>
  )
}

type PopoverButtonArg = {
  open?: boolean
}
type PopoverButtonProps = {
  as?: ElementType
  className?: string
  children?: ReactNode | ((arg: PopoverButtonArg) => ReactElement)
}
const PopoverButton = ({
  className = '',
  children,
  ...restProps
}: PopoverButtonProps) => {
  const { setReferenceElement } = usePopoverContext()
  // const [referenceElement, setReferenceElement] = useState()
  return (
    <HeadlessUIPopover.Button
      ref={setReferenceElement}
      className={clsm(className)}
      {...restProps}
    >
      {typeof children === 'function' ? (arg) => children(arg) : children}
    </HeadlessUIPopover.Button>
  )
}

type PopoverPanelProps = {
  as?: ElementType
  children: ReactNode
  className?: string
}
const PopoverPanel = ({
  children,
  className = '',
  ...restProps
}: PopoverPanelProps) => {
  const { setPopperElement, stylesPopper, attributesPopper } =
    usePopoverContext()

  return (
    <Transition
      as={Fragment}
      enter='tw-transition-opacity tw-ease-out tw-duration-200'
      enterFrom='tw-opacity-0'
      enterTo='tw-opacity-100'
      leave='tw-transition-opacity tw-ease-in tw-duration-150'
      leaveFrom='tw-opacity-100'
      leaveTo='tw-opacity-0'
    >
      <HeadlessUIPopover.Panel
        className={clsm(
          className,
          'tw-z-10 tw-px-4',
          'tw-rounded-lg tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-bg-white'
        )}
        ref={setPopperElement}
        style={stylesPopper}
        {...attributesPopper}
        {...restProps}
      >
        {children}
      </HeadlessUIPopover.Panel>
    </Transition>
  )
}

export const Popover = Object.assign(PopoverComponent, {
  Button: PopoverButton,
  Panel: PopoverPanel,
})
