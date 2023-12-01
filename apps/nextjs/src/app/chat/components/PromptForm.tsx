import * as React from "react";
import type { UseChatHelpers } from "ai/react";

import { Button, Textarea, Tooltip } from "@vyductan/components";
import { useEnterSubmit } from "@vyductan/hooks";
import { Icon } from "@vyductan/icons";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  isLoading: boolean;
  inputFormatter?: (input: string) => string;
  onSubmit: (value: string) => Promise<void>;
}

export function PromptForm({
  isLoading,
  inputFormatter,
  input,
  setInput,
  onSubmit,
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
        await onSubmit(inputFormatter?.(input) || input);
      }}
      ref={formRef}
      className="relative"
    >
      {/* <Tooltip title="Clear Chat"> */}
      {/*   <Button */}
      {/*     type="ghost" */}
      {/*     size="sm" */}
      {/*     onClick={(e) => { */}
      {/*       e.preventDefault(); */}
      {/*     }} */}
      {/*     icon={ */}
      {/*       <> */}
      {/*         <Icon icon="ant-design:clear-outlined" /> */}
      {/*         <span className="sr-only">Clear Chat</span> */}
      {/*       </> */}
      {/*     } */}
      {/*   /> */}
      {/* </Tooltip> */}

      <Textarea
        ref={inputRef}
        className="pr-14"
        autoSize
        maxRows={8}
        size="xl"
        placeholder="Send a message."
        spellCheck={false}
        tabIndex={0}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
      />

      <Tooltip title="Send message">
        <Button
          type="primary"
          className="absolute bottom-5 right-4"
          disabled={isLoading || input === ""}
          htmlType="submit"
          size="sm"
          icon={<Icon icon="lucide:send" srOnly="Send message" />}
        />
      </Tooltip>
    </form>
  );
}
