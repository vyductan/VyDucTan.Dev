import { useRef } from "react";
import { getDayOfWeek, isSameDay } from "@internationalized/date";
import {
  useCalendarCell,
  type AriaCalendarCellProps,
} from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { useLocale } from "@react-aria/i18n";
import { type RangeCalendarState } from "@react-stately/calendar";
import { clsm } from "@vyductan/react";

export type CalendarCellProps = AriaCalendarCellProps & {
  state: RangeCalendarState;
};
export const CalendarCell = ({ state, date }: CalendarCellProps) => {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell({ date }, state, ref);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  const isSelectionStart = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected;
  const isSelectionEnd = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected;

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  const isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={clsm("relative py-0.5", isFocusVisible ? "z-10" : "z-0")}
    >
      <div
        {...buttonProps}
        {...focusProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={clsm(
          "group h-10 w-10 outline-none",
          isRoundedLeft ? "rounded-l-full" : "",
          isRoundedRight ? "rounded-r-full" : "",
          isSelected ? (isInvalid ? "bg-red-300" : "bg-violet-300") : "",
          // isDisabled ? 'disabled' : ''
        )}
      >
        <div
          className={clsm(
            "flex h-full w-full items-center justify-center rounded-full",
            isDisabled && !isInvalid ? "text-gray-400" : "",
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible
              ? "ring-2 ring-violet-600 ring-offset-2 group-focus:z-20"
              : "",
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd
              ? isInvalid
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-violet-600 text-white hover:bg-violet-700"
              : "",
            // Hover state for cells in the middle of the range.
            isSelected && !isDisabled && !(isSelectionStart || isSelectionEnd)
              ? isInvalid
                ? "hover:bg-red-400"
                : "hover:bg-violet-400"
              : "",
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? "hover:bg-violet-100" : "",
            "cursor-default",
          )}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
};
