import { useRef } from "react";
import { createCalendar, endOfMonth } from "@internationalized/date";
import {
  useRangeCalendar,
  type AriaRangeCalendarProps,
} from "@react-aria/calendar";
import { type DateValue } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { useRangeCalendarState } from "@react-stately/calendar";

import { CalendarButton } from "./Button";
import { CalendarGrid } from "./Grid";

export type RangeCalendarProps = AriaRangeCalendarProps<DateValue>;
export const RangeCalendar = (props: RangeCalendarProps) => {
  const { locale } = useLocale();
  const firstState = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const secondState = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, firstState, ref);
  const {
    calendarProps: secondCalendarProps,
    prevButtonProps: secondPrevButtonProps,
    nextButtonProps: secondNextButtonProps,
    title: secondTitle,
  } = useRangeCalendar(props, firstState, ref);

  return (
    <div
      {...calendarProps}
      ref={ref}
      className="inline-block"
    >
      <div className="flex items-center pb-4">
        <CalendarButton {...prevButtonProps}>
          <span className="icon-[heroicons--chevron-left] h-6 w-6" />
        </CalendarButton>
        <h2 className="flex-1 text-center text-xl font-bold">{title}</h2>
        <CalendarButton {...nextButtonProps}>
          <span className="icon-[heroicons--chevron-right] h-6 w-6" />
        </CalendarButton>
      </div>
      <CalendarGrid state={firstState} />

      <div className="flex items-center pb-4">
        <CalendarButton {...secondPrevButtonProps}>
          <span className="icon-[heroicons--chevron-left] h-6 w-6" />
        </CalendarButton>
        <h2 className="flex-1 text-center text-xl font-bold">{secondTitle}</h2>
        <CalendarButton {...secondNextButtonProps}>
          <span className="icon-[heroicons--chevron-right] h-6 w-6" />
        </CalendarButton>
      </div>
      <CalendarGrid
        state={secondState}
        startDate={firstState.visibleRange.start.add({ months: 1 })}
        endDate={endOfMonth(firstState.visibleRange.start.add({ months: 1 }))}
      />
    </div>
  );
};
