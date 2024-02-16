import { useRef } from "react";
import { createCalendar } from "@internationalized/date";
import {
  useDateField,
  useDateSegment,
  type AriaDateFieldOptions,
  type DateValue,
} from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import {
  useDateFieldState,
  type DateFieldState,
  type DateSegment as DateSegmentType,
} from "@react-stately/datepicker";

export type DateFieldProps = AriaDateFieldOptions<DateValue>;
export const DateField = (props: DateFieldProps) => {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });
  const ref = useRef(null);
  const { fieldProps } = useDateField(props, state, ref);
  return (
    <div
      {...fieldProps}
      ref={ref}
      className="flex"
    >
      {state.segments.map((segment, i) => (
        <DateSegment
          key={i}
          segment={segment}
          state={state}
        />
      ))}
    </div>
  );
};

type DateSegmentProps = {
  segment: DateSegmentType;
  state: DateFieldState;
};
const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null
            ? `${String(segment.maxValue).length} ch`
            : undefined,
      }}
      className={`group box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-violet-600 focus:text-white ${
        !segment.isEditable ? "text-gray-500" : "text-gray-800"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
};
