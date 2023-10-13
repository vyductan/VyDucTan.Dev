"use server";

import { createServerAction } from "@vyductan/react";
import { message } from "antd";
import {
  Configuration,
  OpenAIApi,
  type ChatCompletionResponseMessage,
} from "openai";

import { env } from "~/env.mjs";
import { OpenAIStream } from "./OpenAISTream";
import { type ChatGPTMessage, type OpenAIStreamPayload } from "./types";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatGptAction = async (messages: ChatGPTMessage[]) => {
  const response = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages,
      stream: true,
    },
    { responseType: "stream" },
  );

  return response.data.choices
    .map((c) => c.message)
    .filter((m): m is ChatCompletionResponseMessage => !!m);
};

type StreamResponse = {
  on: (type: "data" | "close", fn: (data?: Buffer) => void) => void;
};
export const streamChatGptAction = async (messages: ChatGPTMessage[]) => {
  const response = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages,
      stream: true,
    },
    { responseType: "stream" },
  );

  // response.data.on('data', (data) => {
  //   console.log('ddddddddddd', data)
  // })
  // return response.data
  // console.log('rrrrrrrs', response.data)
  // response.data.on('close', (e) => {
  //   console.log('ccccccccc', e)
  // })
  // return {}
  // // response.data
  // return response.data.choices
  //   .map((c) => c.message)
  //   .filter((m): m is ChatCompletionResponseMessage => !!m)
};

export const getOpenAiApiKey = createServerAction()(() => {
  return env.OPENAI_API_KEY;
});

export const chatGPTChatStreamAction = async (messages: ChatGPTMessage[]) => {
  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    stream: true,
  };
  const stream = await OpenAIStream(payload);
  console.log("stream", stream);

  // return new Response(stream)
  return {
    s: stream,
  };
  return stream;
};
