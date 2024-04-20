import { cacheExchange, fetchExchange, Client as UrqlClient } from "urql";

export const urqlClient = new UrqlClient({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' },
  //   };
  // },
});
