"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { useHover } from "ahooks";
import { cva } from "class-variance-authority";
import { useMergedState } from "rc-util";

import { clsm } from "..";
import { triggerNativeEventFor } from "../_util/event";
import { Icon } from "../icons";

export const inputStatusVariants = cva(
  [
    "w-full",
    "flex border border-input ring-offset-background",
    "text-sm",
    "focus-within:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      borderless: {
        true: ["border-0", "focus-within:outline-none"],
        false: [
          "border",
          "rounded-md [&>.addon-before]:rounded-s-md [&>.addon-after]:rounded-e-md",
          "focus-within:ring-2",
        ],
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
      status: {
        default: [
          "hover:border-primary-500",
          "focus-within:!border-primary-600 focus-within:ring-primary-100",
        ],
      },
    },
    defaultVariants: {
      borderless: false,
      size: "default",
      status: "default",
    },
  },
);
export const inputSizeVariants = cva([], {
  variants: {
    size: {
      sm: "",
      default: "px-[11px] py-[5px]",
      lg: "px-[11px] py-[9px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputStatusVariants> & {
    /** If allow to remove input content with clear icon */
    allowClear?: boolean | { clearIcon: React.ReactNode };
    suffix?: React.ReactNode;
    addonBefore?: React.ReactNode;
  };
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      allowClear,
      borderless,
      className,
      hidden,
      size,
      status,

      addonBefore,
      suffix,

      id: idProp,
      onChange,
      ...props
    },
    ref,
  ) => {
    const _id = React.useId();
    const id = idProp ?? _id;

    const inputRef = React.useRef<HTMLInputElement>(null);
    const wrapperRef = React.useRef(null);

    // ======================= Ref ========================
    React.useImperativeHandle(ref, () => {
      return inputRef.current!;
    });

    // ====================== Value =======================
    const [value, setValue] = useMergedState(props.defaultValue, {
      value: props.value,
    });

    // ================== Prefix & Suffix ================== //
    const isHovering = useHover(wrapperRef);
    const suffixComp = suffix ? (
      allowClear && isHovering && value ? (
        <button
          type="button"
          className="opacity-30 hover:opacity-50"
          onClick={() => {
            triggerNativeEventFor(document.getElementById(id), {
              event: "input",
              value: "",
            });
          }}
        >
          <Icon
            icon="icon-[ant-design--close-circle-filled]"
            className="pointer-events-none size-4"
          />
        </button>
      ) : (
        suffix
      )
    ) : null;

    return (
      <span
        ref={wrapperRef}
        aria-hidden={hidden ? "true" : undefined}
        className={clsm(
          inputStatusVariants({ borderless, size, status }),
          "cursor-text",
          className,
        )}
        onClick={() => {
          document.getElementById(id)?.focus();
        }}
      >
        {addonBefore && (
          <span
            className={clsm(
              "addon-before",
              "border-e bg-muted",
              inputSizeVariants({ size }),
            )}
          >
            {addonBefore}
          </span>
        )}
        <input
          id={id}
          ref={inputRef}
          className={clsm(
            "w-full",
            "bg-transparent",
            "placeholder:text-muted-foreground",
            "border-none outline-none",
            inputSizeVariants({ size }),
          )}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            onChange?.(e);
          }}
          {...props}
        />
        {suffixComp && <span className="flex items-center">{suffixComp}</span>}
      </span>
    );
  },
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
