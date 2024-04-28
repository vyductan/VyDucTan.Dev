"use client";

import { api } from "~/trpc/react";

export default function TestPage() {
  api.words.byCambridge.useQuery({ word: "active" });

  return <div>Example</div>;
}
