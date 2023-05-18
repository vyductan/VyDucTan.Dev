import { type Schema, type z } from 'zod'

type ServerActionResponse<TResult> = {
  success: boolean
  data?: TResult
  error?: string
}
export const serverAction = {
  input: <TParams extends Schema>(schema: TParams) => {
    return {
      query: <TResult = void>(
        resolver: ({ input }: { input: z.infer<typeof schema> }) => TResult
      ) => {
        return (
          input: z.infer<typeof schema> | FormData
        ): ServerActionResponse<TResult> => {
          try {
            // validate input
            // try {
            let values = input
            if (input instanceof FormData) {
              values = Object.fromEntries(input)
            }
            schema.parse(values)
            // } catch (error) {
            //   return {
            //     success: false,
            //     formErrors: error
            //   }
            // }

            return {
              success: true,
              data: resolver({ input }),
            }
          } catch (error) {
            console.log(error)
            return {
              success: false,
              error: 'Error from server',
            }
          }
        }
      },
    }
  },
}
