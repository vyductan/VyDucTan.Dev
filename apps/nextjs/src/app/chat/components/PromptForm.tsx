import * as React from "react";
import type { UseChatHelpers } from "ai/react";

import { Button, Textarea, Tooltip } from "@vyductan/components";
import { useEnterSubmit } from "@vyductan/hooks";
import { Icon } from "@vyductan/icons";
import { clsm } from "@vyductan/utils";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => Promise<void>;
  isLoading: boolean;
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!input?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(input);
      }}
      ref={formRef}
    >
      <div
        className={clsm(
          "relative flex max-h-60 w-full grow items-center overflow-hidden bg-background px-4",
          "sm:rounded-md sm:border",
        )}
      >
        <Tooltip content="Clear Chat">
          <Button
            type="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
            }}
            icon={
              <>
                <Icon icon="ant-design:clear-outlined" />
                <span className="sr-only">New Chat</span>
              </>
            }
          />
        </Tooltip>

        <Textarea
          ref={inputRef}
          autoSize
          borderless
          className={clsm(
            "min-h-[60px] w-full resize-none border-0 bg-transparent px-4 py-[1.4rem]",
            "sm:text-sm",
          )}
          placeholder="Send a message."
          rows={1}
          spellCheck={false}
          tabIndex={0}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />

        <Tooltip content="Send message">
          <Button
            type="primary"
            size="sm"
            htmlType="submit"
            disabled={isLoading || input === ""}
            icon={
              <>
                <Icon icon="lucide:send" />
                <span className="sr-only">Send message</span>
              </>
            }
          />
        </Tooltip>
      </div>
    </form>
  );
}
