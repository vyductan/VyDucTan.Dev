import type { z } from "zod";

import type { EnglishAddSchema } from "./validator";

export type EnglishAdd = z.infer<typeof EnglishAddSchema>;
