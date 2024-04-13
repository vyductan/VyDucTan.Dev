import type { UseChatHelpers } from "ai/react";

import { Button } from "@acme/ui/button";
import { Icon } from "@acme/ui/icons";

import { ButtonScrollToBottom } from "./ButtonScrollToBottom";
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
  inputFormatter?: (input: string) => string;
  inputParser?: (input: string) => string;
}

export function ChatPanel({
  id,
  isLoading,
  input,
  setInput,
  messages,
  inputFormatter,
  inputParser,
  stop,
  append,
  reload,
}: ChatPanelProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 pt-10">
      <ButtonScrollToBottom />
      <div className="mx-auto space-y-4 p-4 sm:max-w-2xl">
        <div className="flex items-center justify-center">
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
        <PromptForm
          onSubmit={async (value) => {
            await append({
              id,
              content: inputParser?.(value) ?? value,
              role: "user",
            });
          }}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          inputFormatter={inputFormatter}
        />
      </div>
    </div>
  );
}
