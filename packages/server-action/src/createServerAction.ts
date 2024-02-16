// import _ from 'lodash'
import type z from "zod";

import { type FormErrors } from "../components/Form";

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

type ActionType<TInput extends z.ZodTypeAny, TResponse> = (
  input: z.infer<TInput>,
) => Promise<TResponse> | TResponse;

export type ServerAction<TInput extends z.ZodTypeAny, TResponse> = Brand<
  ActionType<TInput, TResponse>,
  "server-action"
>;

export function createServerAction<TInput extends z.ZodTypeAny>(
  validator?: TInput,
) {
  // This is the "factory" that is created on call of zact. You pass it a "use server" function and it will validate the input before you call it
  return function <TResponse>(
    action: ActionType<TInput, TResponse>,
  ): ServerAction<TInput, TResponse> {
    // The wrapper that actually validates
    const validatedAction = async (input: z.infer<TInput>) => {
      // Validate input
      if (validator) {
        // Strip out all values with empty strings
        // https://github.com/react-hook-form/react-hook-form/issues/656#issuecomment-680674438
        // https://gist.github.com/bennettdams/463c804fcfde0eaa888eaa4851c668a1
        // const sanitizedValues = _.pickBy(input, !_.isEmpty)
        const result = validator.safeParse(input);
        if (!result.success) {
          // throw result.error
          throw new Error(
            JSON.stringify(
              result.error.issues.map(
                ({ path, code, message }): FormErrors[number] => ({
                  // name: path,
                  field: path.join("."),
                  type: code,
                  message: message,
                }),
              ),
            ),
          );
        }
      }
      return await action(input);
    };

    return validatedAction as ServerAction<TInput, TResponse>;
  };
}
