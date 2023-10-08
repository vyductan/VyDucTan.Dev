import {
  endOfMonth,
  getWeeksInMonth,
  type DateDuration,
} from "@internationalized/date";
import {
  useCalendarGrid,
  type AriaCalendarGridProps,
} from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { type RangeCalendarState } from "@react-stately/calendar";

import { CalendarCell } from "./Cell";

type CalendarGridProps = AriaCalendarGridProps & {
  state: RangeCalendarState;
};

export const CalendarGrid = ({ state, ...restProps }: CalendarGridProps) => {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    restProps,
    state,
  );
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table
      {...gridProps}
      cellPadding="0"
      className="flex-1"
    >
      <thead
        {...headerProps}
        className="text-gray-600"
      >
        <tr>
          {weekDays.map((day, index) => (
            <th
              className="text-center"
              key={index}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state.getDatesInWeek(weekIndex).map((date, i) =>
              date ? (
                <CalendarCell
                  key={i}
                  state={state}
                  date={date}
                />
              ) : (
                <td key={i} />
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
