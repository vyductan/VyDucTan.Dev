"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useChat } from "ai/react";
import type { Message } from "ai/react";

import { Button, Input, Modal, toast } from "@vyductan/components";
import { useLocalStorage } from "@vyductan/hooks";
import { Icon } from "@vyductan/icons";
import { clsm } from "@vyductan/utils";

import { ChatList } from "./ChatList";
import { ChatPanel } from "./ChatPanel";
import { ChatScrollAnchor } from "./ChatScrollAnchor";

export interface ChatProps extends Omit<React.ComponentProps<"div">, "title"> {
  initialMessages?: Message[];
  title?: ReactNode;
  inputFormatter?: (input: string) => string;
  inputParser?: (input: string) => string;
}
export const Chat = ({
  id,
  initialMessages,
  className,
  title,
  inputFormatter,
  inputParser,
}: ChatProps) => {
  const [manualToken, setManualToken] = useLocalStorage<string | null>(
    "ai-token",
    null,
  );
  const [manualTokenIsOpen, setManualTokenIsOpen] = useState(false);
  const [manualTokenInput, setManualTokenInput] = useState(manualToken ?? "");

  const {
    messages,
    setMessages,
    append,
    reload,
    stop,
    isLoading,
    input,
    setInput,
  } = useChat({
    initialMessages,
    id,
    body: {
      id,
      manualToken,
    },
    onResponse(response) {
      if (response.status === 401) {
        toast.error({
          title: response.statusText,
        });
      }
    },
  });

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  return (
    <div className={clsm("relative w-full rounded-md border")}>
      <div className="relative flex justify-center border-b p-4">
        <div>{title}</div>
        <div className="absolute inset-y-0 right-0 flex w-fit items-center justify-center px-4">
          <Button
            type="ghost"
            icon={<Icon icon="uil:setting" />}
            onClick={() => setManualTokenIsOpen(true)}
          />
        </div>
      </div>

      <div className={clsm("h-full pb-[200px]", className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : null}
      </div>

      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        inputFormatter={inputFormatter}
        inputParser={inputParser}
      />

      <Modal
        onOk={() => {
          setManualToken(manualTokenInput);
          setManualTokenIsOpen(false);
        }}
        onCancel={() => setManualTokenIsOpen(false)}
        open={manualTokenIsOpen}
        title="Enter your OpenAI Key"
        description={
          <>
            If you have not obtained your OpenAI API key, you can do so by{" "}
            <a href="https://platform.openai.com/signup/" className="underline">
              signing up
            </a>{" "}
            on the OpenAI website. This is only necessary for preview
            environments so that the open source community can test the app. The
            token will be saved to your browser&apos;s local storage under the
            name <code className="font-mono">ai-token</code>.
          </>
        }
      >
        <Input
          value={manualTokenInput}
          placeholder="OpenAI API key"
          onChange={(e) => setManualTokenInput(e.target.value)}
        />
      </Modal>
    </div>
  );
};
