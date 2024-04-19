// import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";

import { schema } from "@acme/graphql";

const yoga = createYoga({ schema });
// const server = createServer(yoga);

// console.log("Bun.env", Bun.env, process.env);
const server = Bun.serve({
  fetch: yoga,
  port: 4000,
});

console.info(
  `Server is running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`,
  )}`,
);

// server.listen(4000, () => {
//   console.log("Running a GraphQL API server at http://localhost:4000/graphql");
// });
