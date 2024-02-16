import {
  type ChatCompletionResponseMessage,
  type CreateChatCompletionRequest,
} from "openai";

export type ChatGPTMessage = ChatCompletionResponseMessage;

export type OpenAIStreamPayload = CreateChatCompletionRequest;

type OpenAIStreamChoice = {
  delta: {
    role?: string;
    content?: string;
  };
  index: number;
  finish_reason: "stop" | null;
};
export type OpenAIStreamResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<OpenAIStreamChoice>;
};
