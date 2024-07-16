import { createBunHttpHandler } from "trpc-bun-adapter";

import { appRouter, createTRPCContext } from "@acme/api";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
const setCorsHeaders = (res: Response) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
};

// Bun.serve({
//   port: 3000,
//   async fetch(req) {
//     const session = {
//       user: {
//         id: "user-id-1234",
//         email: "vdt5snet@gmail.com",
//       },
//       expires: "1234567",
//     };
//     const response = await fetchRequestHandler({
//       endpoint: "/api/trpc",
//       router: appRouter,
//       req,
//       createContext: () => createTRPCContext({ session, headers: req.headers }),
//       onError({ error, path }) {
//         console.error(`>>> tRPC Error on '${path}'`, error);
//       },
//     });
//
//     setCorsHeaders(response);
//     return response;
//   },
// });
Bun.serve({
  port: 8762,
  async fetch(request, response) {
    if (request.method === "OPTIONS") {
      const response = new Response(null, {
        status: 204,
      });
      setCorsHeaders(response);
      return response;
    }

    const session = {
      user: {
        id: "user-id-1234",
        email: "vdt5snet@gmail.com",
      },
      expires: "1234567",
    };
    // setCorsHeaders(response.);
    return (
      createBunHttpHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        createContext: () =>
          createTRPCContext({ session, headers: request.headers }),
        responseMeta: () => {
          const res = new Response();
          setCorsHeaders(res);
          return {
            headers: {
              "Access-Control-Allow-Origin": "*",
              // "Access-Control-Request-Method": "*",
              "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
              "Access-Control-Allow-Headers": "*",
            },
          };
        },
        // createContext: () =>
        //   createTRPCContext({
        //     session: {
        //       user: {
        //         id: "user-id-1234",
        //         email: "vdt5snet@gmail.com",
        //       },
        //       expires: "1234567",
        //     },
        //     headers: new Headers(),
        //   }),
      })(request, response) ?? new Response("Not found", { status: 404 })
    );
  },
});
// Bun.serve(
//   createBunServeHandler({
//     endpoint: "/api/trpc",
//     router: appRouter,
//     createContext: () =>
//       createTRPCContext({
//         session: {
//           user: {
//             id: "user-id-1234",
//             email: "vdt5snet@gmail.com",
//           },
//           expires: "1234567",
//         },
//         headers: new Headers(),
//       }),
//   }),
// );
