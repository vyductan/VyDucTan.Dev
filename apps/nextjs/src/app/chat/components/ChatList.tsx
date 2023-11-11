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
    <div className="flex flex-col gap-2 overflow-auto p-6">
      {messages.map((message, idx) => (
        <div key={idx}>
          <ChatMessage message={message} />
        </div>
      ))}
    </div>
  );
};
