"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type FieldValues } from "react-hook-form";
import { type z, type ZodIssueBase } from "zod";

import { FormErrors } from "../components/form/types";
import { type ServerAction } from "./createServerAction";
import { ServerActionResponse } from "./types";

type FieldError = Omit<ZodIssueBase, "path"> & {
  field: ZodIssueBase["path"];
};
type ServerActionError = string | FieldError[];
type UseServerActionOptions<TValues> = {
  input?: TValues;
  manual?: boolean;
};
export function useServerAction<
  TValues extends FieldValues,
  TInput extends z.ZodTypeAny = z.ZodTypeAny,
  TResponse = any,
>(
  action?: ServerAction<TInput, TResponse>,
  options?: UseServerActionOptions<TValues>,
) {
  const doAction = useRef(action);

  const [data, setData] = useState<TResponse>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerActionError | null>(null);
  // const [formErrors, setFormErrors] = useState<FormErrors<TInput>>([])
  const [formErrors, setFormErrors] = useState<FormErrors<TValues>>([]);

  const mutate = useMemo(
    () =>
      async (
        input?: z.infer<TInput> | FieldValues,
      ): Promise<ServerActionResponse> => {
        setLoading(true);
        setError(null);
        setData(undefined);
        try {
          const result = doAction.current
            ? await doAction.current(input)
            : undefined;
          setData(result);
          setLoading(false);

          const data = result ? { data: result as TResponse } : {};
          return {
            success: true,
            ...data,
          };
        } catch (e: unknown) {
          let error: unknown = "Unknown Error";
          if (e instanceof Error) {
            error = JSON.parse(e.message) as unknown;
            if (typeof error === "string") {
              setError(error);
            } else if (Array.isArray(error) && error.length > 0) {
              const first = error[0] as unknown;
              if (first instanceof Object && first.hasOwnProperty("field")) {
                setFormErrors(error);
              }
            }
          }
          // console.log('ssssssssss', e instanceof ZodError)
          // if (e instanceof z.ZodError) {
          //   console.log('?????', e)
          //   setError(
          //     e.issues.map(({ path, message }) => ({
          //       field: path,
          //       message: message,
          //     }))
          //   )
          // } else if (e instanceof Error) {
          //   console.log('mmmmmmmmm', e.name, e.message, 'x', e.cause, e.stack)
          //   setError(e.message)
          // }
          return {
            success: false,
            error,
          };
        } finally {
          setLoading(false);
        }
      },
    [],
  );

  useEffect(() => {
    console.log("options");
  }, [options]);
  useEffect(() => {
    console.log("mutate");
  }, [mutate]);

  useEffect(() => {
    console.log("changed", options?.manual, options?.input, mutate);
    if (!options?.manual) {
      mutate(options?.input);
      // async function fetchData() {
      //   await mutate()
      // }
      // fetchData().then(data => {
      //   setData(data)
      // }).catch(error=> {
      //     setError(error)
      //   })
    }
  }, [options?.manual, mutate]);

  return {
    mutate,
    data,
    loading,
    error,
    formErrors,
  };
}
