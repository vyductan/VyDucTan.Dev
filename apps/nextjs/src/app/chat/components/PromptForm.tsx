import type { UseChatHelpers } from "ai/react";
import * as React from "react";

import { useEnterSubmit } from "@acme/hooks";
import { Button } from "@acme/ui/button";
import { Icon } from "@acme/ui/icons";
import { Textarea } from "@acme/ui/textarea";
import { Tooltip } from "@acme/ui/tooltip";

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
        await onSubmit(inputFormatter?.(input) ?? input);
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
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={onKeyDown}
      />

      <Tooltip title="Send message">
        <Button
          primary
          className="absolute bottom-5 right-4"
          disabled={isLoading || input === ""}
          type="submit"
          size="sm"
          icon={<Icon icon="lucide:send" srOnly="Send message" />}
        />
      </Tooltip>
    </form>
  );
}
