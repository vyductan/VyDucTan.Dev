import type { AnyVariables, DocumentInput } from "urql";
import { useMutation as urqlUseMutation } from "urql";

export const useMutation = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data = any,
  // Variables extends AnyVariables = AnyVariables,
  Variables extends { input: AnyVariables } = { input: AnyVariables },
>({
  mutationFn: query,
}: {
  mutationFn: DocumentInput<Data, Variables>;
}) => {
  const [urqlResult, urqlMutate] = urqlUseMutation(query);
  const mutate = (input: Variables["input"]) =>
    urqlMutate({ input } as Variables);
  const { fetching, ...rest } = urqlResult;
  return { mutate, loading: fetching, ...rest };
};
