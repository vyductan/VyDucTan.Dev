import clsm from "../_util/clsm"
import { FormItemValidateStatus } from "../form/types"
import { InputProps } from "./Input"

export const getInputCls = (
  size?: InputProps["size"],
  bordered: InputProps["bordered"] = true,
) =>
  clsm(
    // 'rounded-base border-0 ring-1 py-1.5 shadow-sm ring-inset ring-gray-300',
    // 'hover:ring-1 hover:ring-inset hover:ring-primary-600',
    // 'focus:ring-2 focus:ring-inset focus:ring-primary-600',
    "py-1.5",
    bordered ? "rounded-default border-default" : "border-0 outline-0 ring-0",
    bordered && "hover:border-primary-hover",
    // 'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
    bordered && "focus:border-primary-hover focus:ring-primary-hover",
    "text-gray-900 placeholder:text-gray-400",
    "leading-6",
    size === "sm" && "px-2 py-0",
    size === "md" && "px-2 py-1.5",
    size === "lg" && "px-3 py-[7px] text-lg",
    size === "xl" && "px-4 py-[9px] text-xl",
  )

export const getValidateStatus = (validateStatus?: FormItemValidateStatus) =>
  clsm(
    // validateStatus === 'error' && 'ring-error focus:ring-2'
    validateStatus === "error" &&
      "border-red-500 hover:border-red-300 focus:border-red-500 focus:ring-red-100",
  )
