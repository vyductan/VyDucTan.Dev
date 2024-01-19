import { customType } from "drizzle-orm/pg-core";
import {
  Range,
  RANGE_LB_INC,
  parse as rangeParse,
  serialize as rangeSerialize,
} from "postgres-range";

export interface DateRange {
  start: Date | null;
  end?: Date | null;
}

export class TsRange {
  constructor(public readonly range: Range<Date>) {}

  get start() {
    return this.range.lower != null
      ? {
          value: this.range.lower,
          inclusive: this.range.isLowerBoundClosed(),
        }
      : null;
  }

  get end() {
    return this.range.upper != null
      ? {
          value: this.range.upper,
          inclusive: this.range.isUpperBoundClosed(),
        }
      : null;
  }

  static fromInput(input: DateRange): TsRange {
    const range = new Range<Date>(
      input.start,
      input.end ?? input.start,
      RANGE_LB_INC,
    );

    return new TsRange(range);
  }
}

export const tsrange = customType<{
  data: TsRange;
}>({
  dataType: () => "tsrange",
  fromDriver: (value: unknown): TsRange => {
    if (typeof value !== "string") {
      throw new Error("Expected string");
    }

    const parsed = rangeParse<Date>(value, (val) => new Date(val));
    return new TsRange(parsed);
  },
  toDriver: (value: TsRange): string => rangeSerialize(value.range),
});
