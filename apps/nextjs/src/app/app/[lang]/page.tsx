"use client";

import { api } from "~/trpc/react";
import { clsm } from "..";

export default function TestPage() {
  api.words.byCambridge.useQuery({ word: "active" });

  const x = clsm("w-ful");
  return <div>Example</div>;
}
