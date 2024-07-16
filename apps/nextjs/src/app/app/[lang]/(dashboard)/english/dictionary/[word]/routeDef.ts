import { createRoute } from "~/routes/createRouter";
import { RootRoute } from "~/routes/root";

export const DictionaryWordRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/english/dictionary/$word",
});
