import { z } from "zod";

import { EnglishAddSchema } from "./validator";

export type EnglishAdd = z.infer<typeof EnglishAddSchema>;
