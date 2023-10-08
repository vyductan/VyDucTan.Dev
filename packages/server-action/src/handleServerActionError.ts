import { isAxiosError } from "axios";

export const handleServerActionError = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    }
    console.log(error.config);
  }
  // if (error instanceof Error) {
  //   console.log(error.message)
  // }
  // console.log(error)
  throw error;
};
