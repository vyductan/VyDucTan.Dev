import type { ClientStreamChatCompletionConfig } from "openai-ext";
import { useEffect, useState } from "react";
import { OpenAIExt } from "openai-ext";

import { type ChatGPTMessage } from "./types";

export const useChatGpt = () => {
  const [isDone, setIsDone] = useState(true);
  const [xhr, setXhr] = useState<XMLHttpRequest>();
  const [content, setContent] = useState("");
  const [logedMessages, setLogedMessages] = useState<ChatGPTMessage[]>([]);
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);

  console.log("c", content, messages);

  const sendChatCompletionMessages = (
    message: ChatGPTMessage,
    config: ClientStreamChatCompletionConfig,
  ) => {
    setIsDone(false);
    setContent("");
    setMessages([...messages, message]);
    setLogedMessages([...messages, message]);
    const configMerged: ClientStreamChatCompletionConfig = {
      ...config,
      handler: {
        ...config.handler,
        onContent: (contentDraft) => {
          setContent(contentDraft);
        },
        onDone: (xhr) => {
          setIsDone(true);
          config.handler?.onDone?.(xhr);
        },
      },
    };
    const xhr = OpenAIExt.streamClientChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [...messages, message],
      },
      configMerged,
    );
    setXhr(xhr);
  };

  useEffect(() => {
    console.log("i", isDone, content, messages[messages.length - 1]?.role);
    // if (isDone && content && messages[messages.length - 1]?.role === 'user') {
    //   setMessages([...messages, { role: 'assistant', content }])
    // }
    if (content) {
      setMessages([...logedMessages, { role: "assistant", content }]);
    }
  }, [content, isDone, messages, logedMessages]);

  return { xhr, isDone, sendChatCompletionMessages, content, messages };
};
