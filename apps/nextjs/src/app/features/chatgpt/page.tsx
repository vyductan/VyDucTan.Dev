"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { InputMessage } from "./components/InputMessage";
import { LoadingMessageLine, MessageLine } from "./components/MessageLine";
import { type ChatGPTMessage } from "./types";

const COOKIE_NAME = "ai-chat-gpt3.5";

// https://github.com/deiucanta/chatpad/tree/main
export default function ChatGPTPage() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages: ChatGPTMessage[] = [
      ...messages,
      { role: "user", content: message },
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10); // remember last 10 messages

    const response = await fetch("/features/chatgpt/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME] as string,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;
    let lastMessage = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { role: "assistant", content: lastMessage },
      ]);

      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  return (
    <div className="flex h-[calc(100vh-(64px+24px+64px+48px))]">
      <div className="rounded-base relative flex w-full flex-col justify-end border">
        <div className="flex flex-col gap-2 overflow-auto p-6">
          {messages.map(({ content, role }, index) => (
            <MessageLine key={index} role={role} content={content} />
          ))}

          {loading && <LoadingMessageLine />}

          <InputMessage
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
