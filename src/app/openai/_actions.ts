'use server'

import {
  type ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from 'openai'

import { env } from '~/env.mjs'

import { type ChatGptMessages } from './types'

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const chatGptAction = async (messages: ChatGptMessages) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 1,
    messages,
  })
  return response.data.choices
    .map((c) => c.message)
    .filter((m): m is ChatCompletionResponseMessage => !!m)
}
