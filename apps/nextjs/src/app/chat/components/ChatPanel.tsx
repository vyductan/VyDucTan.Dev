import type { UseChatHelpers } from "ai/react";

import { Button, ButtonScrollToBottom } from "@vyductan/components";
import { Icon } from "@vyductan/icons";

import { FooterText } from "./FooterText";
import { PromptForm } from "./PromptForm";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl">
        <div className="flex h-12 items-center justify-center">
          {isLoading ? (
            <Button
              onClick={() => stop()}
              className="bg-background"
              icon={<Icon icon="mingcute:stop-line" />}
              size="sm"
            >
              Stop generating
            </Button>
          ) : (
            messages.filter((x) => x.role !== "system" && x.role !== "function")
              ?.length > 0 && (
              <Button
                onClick={() => reload()}
                className="bg-background"
                icon={<Icon icon="mingcute:refresh-anticlockwise-1-line" />}
                size="sm"
              >
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t p-4 shadow-lg">
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
