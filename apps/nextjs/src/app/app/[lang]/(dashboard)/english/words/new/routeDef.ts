import { createRoute } from "~/routes/createRouter";
import { WordsRoute } from "../routeDef";

export const WordNewRoute = createRoute({
  getParentRoute: () => WordsRoute,
  path: "new",
});
