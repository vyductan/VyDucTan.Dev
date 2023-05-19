'use client'
import {
  clsm,
  type FormItemChildProps,
  getInputCls,
  getValidateStatus,
  type InputProps,
} from '@vyductan/react'
import {
  type ChangeEventHandler,
  forwardRef,
  type KeyboardEventHandler,
  type Ref,
  type TextareaHTMLAttributes,
  useState,
} from 'react'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  FormItemChildProps &
  Pick<InputProps, 'size'> & {
    autoSize?:
      | boolean
      | {
          minRows?: number
          maxRows?: number
        }
  }
const TextAreaInternal = (
  {
    className,
    rows,
    autoSize,
    size,
    validateStatus,
    onChange,
    onKeyDown,
    ...rest
  }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>
) => {
  const [inititalRows] = useState(
    typeof autoSize === 'boolean' || (autoSize && !autoSize?.minRows)
      ? 1
      : autoSize?.minRows
      ? autoSize.minRows
      : rows
      ? rows
      : 2
  )

  // handle autosize
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
      ref={ref}
      rows={inititalRows}
      className={clsm(
        // '[transition:all_.3s,height_0s]',
        getInputCls(size),
        getValidateStatus(validateStatus),
        autoSize && 'resize-none',
        className
      )}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  )
}

export const TextArea = forwardRef(TextAreaInternal)
