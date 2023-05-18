'use client'
import { Button, clsm, TextArea, type TextAreaProps } from '@vyductan/react'
import { type KeyboardEventHandler, useState } from 'react'

import { type ChatGptMessages } from '../types'
import { translateByChatGptAction } from './_actions'

export default function TranslatePage() {
  const [currentInput, setCurrentInput] = useState('')
  const [messages, setMessages] = useState<ChatGptMessages>([])

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' && event.metaKey) {
      void handleSubmitMessage('english')
      return
    }
    if (event.key === 'Enter') {
      void handleSubmitMessage('vietnamese')
      return
    }
  }

  const handleInputUserMessageChange: TextAreaProps['onChange'] = (e) => {
    const input = e.currentTarget.value
    setCurrentInput(input)
  }
  const handleSubmitMessage = async (desLanguage: string) => {
    setCurrentInput('')
    try {
      if (currentInput) {
        const currentInputFormated = `"${currentInput}"`
        setMessages((messages) => [
          ...messages,
          {
            message: {
              role: 'user',
              content: currentInputFormated,
            },
          },
        ])
        const choices = await translateByChatGptAction(
          currentInputFormated,
          desLanguage
        )
        setMessages((messages) => [...messages, ...choices])
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <div className='flex h-full justify-center'>
      <div className='relative m-6 flex w-full max-w-screen-lg flex-col justify-end rounded-base border'>
        <div className='flex flex-col gap-2 overflow-auto p-6'>
          {messages.map(({ message }, idx) => (
            <div
              key={idx}
              className={clsm(
                'flex max-w-2/3 rounded-base p-2',
                message?.role === 'user' && 'ml-auto bg-primary-600 text-white',
                message?.role === 'assistant' && 'mr-auto bg-gray-100'
              )}
            >
              {message?.role === 'user' ? (
                <>{message.content}</>
              ) : message?.role === 'assistant' ? (
                <>{message.content}</>
              ) : null}
            </div>
          ))}
        </div>

        <div className='flex items-center gap-4 border-t p-6'>
          <TextArea
            autoSize={{ maxRows: 10 }}
            size='large'
            className='w-full'
            placeholder='Send a message...'
            value={currentInput}
            onChange={handleInputUserMessageChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            onClick={() => void handleSubmitMessage('vietnamese')}
          >
            <span className='icon-[circle-flags--vn]' />
          </Button>
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            onClick={() => void handleSubmitMessage('english')}
          >
            <span className='icon-[circle-flags--us]' />
          </Button>
        </div>
      </div>
    </div>
  )
}
