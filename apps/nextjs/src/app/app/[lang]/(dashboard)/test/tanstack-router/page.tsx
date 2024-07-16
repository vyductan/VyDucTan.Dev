"use client";

import { useNavigate } from "@tanstack/react-router";

import { WordNewRoute } from "../../english/words/new/routeDef";
import { WordsRoute } from "../../english/words/routeDef";

export default function Page() {
  const navigate = useNavigate({ from: WordsRoute.fullPath });
  const navigate_child = useNavigate({ from: WordNewRoute.fullPath });
  return (
    <div>
      <button
        onClick={async () => {
          await navigate({ to: "/english/words/new", search: (prev) => prev });
        }}
      >
        Go
      </button>
      <button
        onClick={async () => {
          await navigate_child({
            to: "/english/words",
            search: (prev) => prev,
          });
        }}
      >
        From Child
      </button>
    </div>
  );
}
