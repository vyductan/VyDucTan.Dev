// import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
// import { nanoid } from "nanoid";
import { Configuration, OpenAIApi } from "openai-edge";

import { auth } from "@vyductan/auth";

import { env } from "~/env.mjs";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const json = await req.json();
  const { messages, previewToken } = json;
  const userId = (await auth())?.user.id;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (previewToken) {
    configuration.apiKey = previewToken;
  }

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(res, {
    onCompletion: async (completion) => {
      // const id = json.id ?? nanoid();
      // const createdAt = Date.now();
      // const payload = {
      //   id,
      //   title: json.messages[0].content.substring(0, 100),
      //   userId,
      //   createdAt,
      //   path: `chat/${id}`,
      //   messages: [
      //     ...messages,
      //     {
      //       content: completion,
      //       role: "assistant",
      //     },
      //   ],
      // };
      // await kv.hmset(`chat:${id}`, payload);
      // await kv.zadd(`user:chat:${userId}`, {
      //   score: createdAt,
      //   member: `chat:${id}`,
      // });
    },
  });

  return new StreamingTextResponse(stream);
}
