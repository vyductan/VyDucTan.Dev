'use client'
import { Button, clsm, TextArea, type TextAreaProps } from '@vyductan/react'
import { type KeyboardEventHandler, useState } from 'react'

import { chatGptAction } from './actions'
import { type ChatGptMessages } from './types'

export default function ChatGPTPage() {
  const [currentInput, setCurrentInput] = useState('')
  const [messages, setMessages] = useState<ChatGptMessages>([])

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter') {
      void handleSubmitMessage()
      return
    }
  }

  const handleInputUserMessageChange: TextAreaProps['onChange'] = (e) => {
    const input = e.currentTarget.value
    setCurrentInput(input)
  }
  const handleSubmitMessage = async () => {
    setCurrentInput('')
    try {
      if (currentInput) {
        const mergedMessage: ChatGptMessages = [
          ...messages,
          {
            role: 'user',
            content: currentInput,
          },
        ]
        setMessages(mergedMessage)
        const response = await chatGptAction(mergedMessage)
        if (response.length > 0)
          setMessages((messages) => [...messages, ...response])
      }
    } catch (error) {
      console.log('Error', error)
    }
  }
  return (
    <div className='flex h-[calc(100vh-(64px+24px+64px+48px))] justify-center'>
      <div className='relative flex w-full max-w-screen-lg flex-col justify-end rounded-base border'>
        <div className='flex flex-col gap-2 overflow-auto p-6 text-xl'>
          {messages.map(({ content, role }, idx) => (
            <div
              key={idx}
              className={clsm(
                'flex max-w-2/3 rounded-base p-2',
                role === 'user' && 'ml-auto bg-primary-600 text-white',
                role === 'assistant' && 'mr-auto bg-gray-100'
              )}
            >
              {role === 'user' ? (
                <>{content}</>
              ) : role === 'assistant' ? (
                <>{content}</>
              ) : null}
            </div>
          ))}
        </div>

        <div className='flex items-center gap-4 border-t p-6'>
          <TextArea
            autoSize={{ maxRows: 10 }}
            size='xl'
            className='w-full'
            placeholder='Send a message...'
            value={currentInput}
            onChange={handleInputUserMessageChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            size='xl'
            type='submit'
            variant='primary'
            onClick={() => void handleSubmitMessage()}
          >
            <span className='icon-[heroicons--paper-airplane-solid]' />
          </Button>
        </div>
      </div>
    </div>
  )
}
