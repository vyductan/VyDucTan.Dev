"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { useClickAway } from "ahooks";
import { format as formatDate, isValid, parse } from "date-fns";

import type { inputStatusVariants } from "../input";
import { Calendar } from "../calendar";
import { Input } from "../input";
import { Popover } from "../popover";

type DateRange = {
  start: Date | undefined;
  end?: Date | undefined;
};

export type DatePickerSingleProps = {
  mode: "single";
  value?: Date;
  /** Callback function, can be executed when the selected time is changing */
  onChange?: (date: Date | undefined, dateString: string) => void;
};
// TODO: https://react-day-picker.js.org/guides/input-fields?#example-range-selection
export type DatePickerRangeProps = {
  mode: "range";
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
};
export type DatePickerProps = (DatePickerSingleProps | DatePickerRangeProps) &
  VariantProps<typeof inputStatusVariants> & {
    format?: string;
  };
const DatePickerInternal = (
  { borderless, format = "P", size, status, ...props }: DatePickerProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(
    props.mode === "single" ? props.value : props.value?.start,
  );
  const inputId = React.useId();

  const handleChange = (input: string | Date) => {
    if (props.mode === "single") {
      if (input === "") {
        props.onChange?.(undefined, "");
      } else {
        let date = input;
        if (typeof date === "string") {
          date = parse(date, format, new Date());
        }
        if (isValid(date)) {
          props.onChange?.(date, formatDate(date, format));
          setMonth(date);
        }
      }
    }
  };

  const picker = (() => {
    if (props.mode === "single") {
      const { value, onChange: _, ...rest } = props;
      return (
        <Calendar
          selected={value}
          onSelect={(_, selectedDate) => {
            handleChange(selectedDate);
            setOpen(false);
          }}
          month={month}
          onMonthChange={setMonth}
          {...rest}
          mode="single"
        />
      );
    }
    if (props.mode === "range") {
      const { value, onChange, ...rest } = props;
      return (
        <Calendar
          initialFocus
          selected={{
            from: value?.start,
            to: value?.end,
          }}
          onSelect={(range) => {
            onChange?.({
              start: range?.from,
              end: range?.to,
            });
          }}
          numberOfMonths={2}
          {...rest}
          mode="range"
        />
      );
    }
    return null;
  })();

  React.useEffect(() => {
    const inputValue = (document.getElementById(inputId) as HTMLInputElement)
      .value;
    if (props.mode === "single") {
      const formattedValue = isValid(props.value)
        ? formatDate(props.value!, format)
        : "";
      if (inputValue !== formattedValue) {
        (document.getElementById(inputId) as HTMLInputElement).value =
          formattedValue;
      }
    }
  }, [props.mode, props.value, inputId, format]);

  useClickAway(
    (e) => {
      if (document.activeElement?.id === inputId) {
        // check if choose a day in panel or not
        if (!(e.target && "name" in e.target && e.target.name === "day")) {
          handleChange(
            (document.getElementById(inputId) as HTMLInputElement)?.value,
          );
        }
      }
    },
    () => document.getElementById(inputId),
  );

  return (
    <>
      <Popover
        open={open}
        className="w-auto p-0"
        content={picker}
        trigger="click"
        sideOffset={8}
        onInteractOutside={(e) => {
          if (e.target && "id" in e.target && e.target.id !== inputId) {
            setOpen(false);
          }
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        {props.mode === "single" ? (
          <Input
            id={inputId}
            borderless={borderless}
            size={size}
            status={status}
            className={clsm("items-center", "justify-start text-left")}
            ref={ref}
            placeholder="Pick a date"
            suffix={
              <Icon
                icon="mingcute:calendar-2-line"
                className="ml-auto size-4 opacity-50"
              />
            }
            onClick={() => {
              if (!open) setOpen(true);
            }}
            onKeyUp={(e) => {
              e.stopPropagation();
              if (e.key === "Enter" || e.key === "Escape") {
                handleChange(e.currentTarget.value);
                setOpen(false);
              }
            }}
            onChange={(e) => {
              if (e.currentTarget.value.length === 10) {
                handleChange(e.currentTarget.value);
              }
            }}
          />
        ) : null}
      </Popover>
    </>
  );
};

export const DatePicker = React.forwardRef(DatePickerInternal);
