"use server";

import {
  Configuration,
  OpenAIApi,
  type ChatCompletionResponseMessage,
} from "openai";

import { env } from "~/env.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const translateByChatGptAction = async (
  message: string,
  desLanguage: string,
) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 1,
    messages: [
      {
        role: "user",
        content:
          desLanguage === "english"
            ? `Translate the following text into English ${message}`
            : `Chuyển đổi văn bản sau sang tiếng Việt ${message}`,
        // `${message} dịch sang tiếng Việt`,
      },
    ],
  });
  return response.data.choices
    .map((c) => c.message)
    .filter((m): m is ChatCompletionResponseMessage => !!m);
};
