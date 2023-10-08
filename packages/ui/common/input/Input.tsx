import { forwardRef, type InputHTMLAttributes, type Ref } from "react"

import clsm from "../_util/clsm"
import { FormItemChildProps } from "../form"
import { type ComponentSize } from "../types"
import { getInputCls, getValidateStatus } from "./utils"

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  FormItemChildProps & {
    size?: ComponentSize
    bordered?: boolean
  }
export const InputInternal = (
  { className, bordered, size, validateStatus, ...rest }: InputProps,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <input
      ref={ref}
      className={clsm(
        "[transition:all_.2s]",
        getInputCls(size, bordered),
        getValidateStatus(validateStatus),
        className,
      )}
      {...rest}
    />
  )
}

export default forwardRef(InputInternal)
