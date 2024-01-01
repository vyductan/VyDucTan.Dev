import { type Dispatch, type SetStateAction } from "react";

import { Button, TextArea } from "@vyductan/react";

type InputMessageProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  sendMessage: (message: string) => void;
};
export const InputMessage = ({
  input,
  setInput,
  sendMessage,
}: InputMessageProps) => (
  <div className="mt-6 flex">
    <TextArea
      aria-label="chat input"
      size="lg"
      autoSize
      className="w-full"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      size="lg"
      appearance="primary"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      <span className="icon-[heroicons--paper-airplane]" />
    </Button>
  </div>
);
