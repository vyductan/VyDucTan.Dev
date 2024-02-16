import { type InputHTMLAttributes, type ReactNode } from "react";
import { clsm } from "@vyductan/react";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  indeterminate?: boolean;
};
export const Checkbox = ({
  label,
  name,
  className = "",
  indeterminate,
  ...restProps
}: CheckboxProps) => {
  return (
    <label
      className="flex cursor-pointer items-center text-base"
      aria-checked={indeterminate ? "mixed" : undefined}
    >
      <span className="relative h-4 w-4 leading-none">
        <input
          type="checkbox"
          className={clsm("absolute opacity-0", className)}
          name={name}
          {...restProps}
        />
        {/* <span */}
        {/*   className={clsm( */}
        {/*     'relative start-0 block h-4 w-4 rounded border', */}
        {/*     'hover:border-blue-600', */}
        {/*     'after:absolute after:table', */}
        {/*     indeterminate && */}
        {/*       "after:start-1/2 after:top-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-blue-500 after:content-['']", */}
        {/*     restProps.checked && 'bg-blue-500' */}
        {/*     // "tw-relative tw-after:content-['*'] after:ml-0.5 after:text-red-500" */}
        {/*   )} */}
        {/* /> */}
        {indeterminate && (
          <span className="absolute left-1/2 top-1/2 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-blue-600" />
        )}
      </span>
      <span className="ml-2">{label}</span>
    </label>
  );
};
