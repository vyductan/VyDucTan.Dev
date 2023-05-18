import { type Placement } from '@popperjs/core'
import {
  type HTMLAttributes,
  type ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react'
import { usePopper } from 'react-popper'

type TooltipProps = {
  label: ReactElement
  placement?: Placement
  enterDelay?: number
  leaveDelay?: number
} & HTMLAttributes<HTMLDivElement>

export const Tooltip = ({
  children,
  label,
  enterDelay = 250,
  leaveDelay = 150,
  placement = 'bottom',
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
  })

  const enterTimeout = useRef<NodeJS.Timeout>()
  const leaveTimeout = useRef<NodeJS.Timeout>()
  const handleMouseEnter = useCallback(() => {
    leaveTimeout.current && clearTimeout(leaveTimeout.current)
    enterTimeout.current = setTimeout(() => setIsOpen(true), enterDelay)
  }, [enterDelay])
  const handleMouseLeave = useCallback(() => {
    enterTimeout.current && clearTimeout(enterTimeout.current)
    leaveTimeout.current = setTimeout(() => setIsOpen(false), leaveDelay)
  }, [leaveDelay])

  return (
    <div>
      <div
        ref={setReferenceElement}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='relative'
      >
        {children}
      </div>

      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={`transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        {label}
      </div>
    </div>
  )
}
