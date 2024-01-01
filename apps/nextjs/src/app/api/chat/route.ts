// import { kv } from "@vercel/kv";
import path from "path";
import { OpenAIStream, StreamingTextResponse } from "ai";
// import { nanoid } from "nanoid";
import OpenAI from "openai";

import { auth } from "@vyductan/api/auth";

import { env } from "~/env";

export const runtime = "edge";

// const configuration = new Configuration({
//   apiKey: env.OPENAI_API_KEY,
// });
//
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const speechFile = path.resolve("./speech.mp3");

export async function POST(req: Request) {
  // const json = await req.json();
  // const { messages, previewToken } = json;
  const userId = (await auth())?.user.id;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = openai.audio.speech.create({
    model: "tts-1-hd",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!",
  });

  response.stream_to_file();

  // console.log(speechFile);

  // const buffer = Buffer.from(await mp3.arrayBuffer());
  // await fs.promises.writeFile(speechFile, buffer);

  // if (previewToken) {
  //   configuration.apiKey = previewToken;
  // }

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
