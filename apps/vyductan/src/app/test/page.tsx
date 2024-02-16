"use client";

import { Checkbox, DatePicker } from "@vyductan/react";

export default function TestPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Checkbox
        indeterminate={true}
        label="asdasd"
      />
      <DatePicker.RangePicker />
    </div>
  );
}
