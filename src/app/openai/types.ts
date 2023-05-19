import {
  type ChatCompletionRequestMessage,
  type ChatCompletionResponseMessage,
  type CreateChatCompletionResponseChoicesInner,
} from 'openai'

export type ChatGptMessages = Array<ChatCompletionResponseMessage>
