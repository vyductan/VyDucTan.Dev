"use client";

import { useRef, useState } from "react";
import {
  useDateRangePicker,
  type AriaDateRangePickerProps,
  type DateValue,
} from "@react-aria/datepicker";
import {
  DateRangePickerState,
  useDateRangePickerState,
} from "@react-stately/datepicker";

import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Popover } from "../Popover";
import { DateField } from "./DateField";

export type RangePickerProps = AriaDateRangePickerProps<DateValue>;
export const RangePicker = (props: RangePickerProps) => {
  const ref = useRef(null);
  const state = useDateRangePickerState(props);
  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref);

  console.log("???", ref, groupProps);
  return (
    <div>
      {/* <div */}
      {/*   ref={ref} */}
      {/*   className='group flex items-center' */}
      {/*   {...groupProps} */}
      {/* > */}
      {/*   <DateField */}
      {/*     {...startFieldProps} */}
      {/*     onFocus={(e) => { */}
      {/*       console.log('e') */}
      {/*       buttonProps.onFocus?.(e) */}
      {/*     }} */}
      {/*   /> */}
      {/*   <span */}
      {/*     aria-hidden='true' */}
      {/*     className='icon-[heroicons--minus]' */}
      {/*   /> */}
      {/*   <DateField {...endFieldProps} /> */}
      {/*   <Button {...buttonProps}> */}
      {/*     <span className='icon-[heroicons--calendar-days] h-5 w-5 text-gray-700 group-focus-within:text-violet-700' /> */}
      {/*   </Button> */}
      {/* </div> */}

      <Popover>
        <Popover.Button as="div">
          <DateField
            {...startFieldProps}
            onFocus={(e) => {
              console.log("e");
              buttonProps.onFocus?.(e);
            }}
          />
          <span
            aria-hidden="true"
            className="icon-[heroicons--minus]"
          />
          <DateField {...endFieldProps} />
        </Popover.Button>
        <Popover.Panel>
          <Calendar.Range {...calendarProps} />
        </Popover.Panel>
      </Popover>
    </div>
  );
};
