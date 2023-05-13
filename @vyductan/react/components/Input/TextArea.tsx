import { clsm, getInputCls, type InputProps } from '@vyductan/react'
import {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type TextareaHTMLAttributes,
  useState,
} from 'react'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Pick<InputProps, 'size'> & {
    autoSize?:
      | boolean
      | {
          minRows?: number
          maxRows?: number
        }
  }
export const TextArea = ({
  className,
  rows,
  autoSize,
  size,
  onChange,
  onKeyDown,
  ...rest
}: TextAreaProps) => {
  const [inititalRows] = useState(
    typeof autoSize === 'boolean' || (autoSize && !autoSize?.minRows)
      ? 1
      : autoSize?.minRows
      ? autoSize.minRows
      : rows
      ? rows
      : 2
  )

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (autoSize) {
      event.target.style.height = 'auto'

      const scrollHeight = event.target.scrollHeight
      const computedStyle = getComputedStyle(event.target)
      const peripheryHeight =
        parseFloat(computedStyle.paddingTop) +
        parseFloat(computedStyle.paddingBottom) +
        parseFloat(computedStyle.borderTop) +
        parseFloat(computedStyle.borderBottom)
      const rowHeight =
        (parseFloat(computedStyle.height) - peripheryHeight) / inititalRows
      const caculatedRows = Math.ceil(scrollHeight / rowHeight) - 1

      let calculatedHeight = parseFloat(computedStyle.height)
      if (
        typeof autoSize === 'boolean' ||
        (autoSize && !autoSize.maxRows) ||
        (autoSize.maxRows && caculatedRows <= autoSize.maxRows)
      ) {
        calculatedHeight = caculatedRows * rowHeight + peripheryHeight
      } else if (autoSize.maxRows && caculatedRows > autoSize.maxRows) {
        calculatedHeight = autoSize.maxRows * rowHeight + peripheryHeight
      }
      event.target.style.height = `${calculatedHeight}px`
      event.target.scrollTop = scrollHeight // fix if rows > maxRows
    }
    onChange?.(event)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault()
    }
    onKeyDown?.(event)
  }

  return (
    <textarea
      {...rest}
      rows={inititalRows}
      className={clsm(
        'form-textarea',
        '[transition:all_.3s,height_0s]',
        getInputCls(size),
        autoSize && 'resize-none',
        className
      )}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}
