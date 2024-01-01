import type { ParsedEvent, ReconnectInterval } from "eventsource-parser";
import type { CreateChatCompletionResponse } from "openai";
import { createParser } from "eventsource-parser";
import { Configuration, OpenAIApi } from "openai";

import { env } from "~/env.mjs";
import { type OpenAIStreamPayload } from "./types";

// const configuration = new Configuration({
//   apiKey: env.OPENAI_API_KEY,
//   organization: process.env.OPENAI_API_ORG,
// })
// const openai = new OpenAIApi(configuration)

export const OpenAIStream = async (payload: OpenAIStreamPayload) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const requestHeaders: HeadersInit = {
    "Content-type": "application/json",
    Authorization: `Bearer ${env.OPENAI_API_KEY}`,
  };

  if (process.env.OPENAI_API_ORG) {
    requestHeaders["OpenAI-Organization"] = process.env.OPENAI_API_ORG;
  }
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify(payload),
  });
  // const response = await openai.createChatCompletion(payload, {
  //   responseType: 'stream',
  // })

  const stream = new ReadableStream({
    start: async (controller) => {
      // callback
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          // https://platform.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data) as CreateChatCompletionResponse;
            const text = json.choices[0]?.message?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      };
      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      console.log("Res body", res.body);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
