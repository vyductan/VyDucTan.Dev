import type { Message } from "ai";

import { ChatMessage } from "./ChatMessage";

export type ChatListProps = {
  messages: Message[];
};
export const ChatList = ({ messages }: ChatListProps) => {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      {messages.map((message, idx) => (
        <ChatMessage key={idx} message={message} />
      ))}
    </div>
  );
};
