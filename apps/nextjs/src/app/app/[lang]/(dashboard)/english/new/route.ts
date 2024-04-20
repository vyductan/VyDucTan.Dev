import { createRoute } from "@tanstack/react-router";

// import WordNewPage from "./page";
import { wordsRoute } from "../route";

export const wordNewRoute = createRoute({
  getParentRoute: () => wordsRoute,
  path: "new",
  // component: WordNewPage,
});
