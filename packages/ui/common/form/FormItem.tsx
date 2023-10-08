import { cloneElement, type ReactElement } from "react"
import { ZodType } from "zod"

import clsm from "../_util/clsm"
import { useFormContext } from "./context"
import { FormItemChildProps } from "./types"

export type FormItemProps = {
  children: ReactElement<FormItemChildProps>
  label?: string
  name?: string
  className?: string
}
const FormItem = ({ children, label, name, className }: FormItemProps) => {
  const { layout, schema, getFieldState, register } = useFormContext()
  // TODO: mark required use ZodSchema (resolver of react form hook)
  const { error } = name ? getFieldState(name) : { error: undefined }
  const registerProps = name ? register(name) : undefined
  const isRequired = name
    ? schema?.shape[name] instanceof ZodType && !schema.isOptional()
    : undefined

  return (
    <div
      className={clsm(
        "flex",
        (!layout || layout === "vertical") && "flex-col",
        layout === "horizontal" && "flex-row items-center",
        !error ? "mb-md" : "",
        className,
      )}
    >
      {label ? (
        <label
          className={clsm(
            "mb-2 text-sm font-medium leading-6",
            isRequired && 'after:ml-0.5 after:text-error after:content-["*"]',
          )}
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <div className="flex flex-col">
        {error && (
          <span className="flex h-md flex-nowrap items-center text-error">
            {error.message}
          </span>
        )}
      </div>
    </div>
  )
}

export default FormItem
