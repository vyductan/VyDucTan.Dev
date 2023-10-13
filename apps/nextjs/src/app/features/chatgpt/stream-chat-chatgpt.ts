import { OpenAIStream } from "~/app/features/chatgpt/OpenAISTream";
import {
  type ChatGPTMessage,
  type OpenAIStreamPayload,
} from "~/app/features/chatgpt/types";

export const runtime = "edge";

const handler = async (req: Request): Promise<Response> => {
  const body = (await req.json()) as { messages: ChatGPTMessage[] };

  const messages = body?.messages;

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
