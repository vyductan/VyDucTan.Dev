"use client";

import { useState } from "react";

import { Tabs } from "@vyductan/ui/tabs";

import { Chat } from "~/app/chat/components/Chat";
import { useAppStore } from "~/app/store";

enum Mode {
  to_vietnamese = "to_vietnamese",
  to_english = "to_english",
  polishing = "polishing",
}
const TranslatePage = () => {
  const { headerHeight } = useAppStore();
  const [mode, setMode] = useState<Mode>(Mode.to_vietnamese);

  return (
    <div
      className="flex w-full justify-center"
      style={{
        height: `calc(100vh - (${headerHeight * 2}px))`,
      }}
    >
      <div className="flex w-full max-w-screen-md gap-6 px-6">
        <Chat
          initialMessages={[
            {
              id: "",
              role: "system",
              content:
                mode === Mode.to_vietnamese
                  ? // ? "You will be provided with a sentence in any language, and your task is to translate it into Vietnamese."
                    `You will be provided with a sentence in any language. Give me definitions in both English and Vietnamese, IPA, examples of that sentence in both English and Vietnamese.
                    `
                  : mode === Mode.to_english
                    ? "You will be provided with a sentence in any language, and your task is to translate it into English."
                    : mode === Mode.polishing
                      ? // ? "You will be provided with statements, and your task is to convert them to standard English and explain it in Vietnamese."
                        "You will be provided with statements, and your task is to convert them to standard English and explain it in Vietnamese."
                      : "",
            },
          ]}
          title={
            <Tabs
              defaultActiveKey={Mode.to_vietnamese}
              items={[
                {
                  key: Mode.to_vietnamese,
                  label: "English → Vietnamese",
                  children: null,
                },
                {
                  key: Mode.to_english,
                  label: "Vietnamese → English",
                  children: null,
                },
                {
                  key: Mode.polishing,
                  label: "Polishing",
                  children: null,
                },
              ]}
              onActiveKeyChange={(activeKey) => {
                setMode(activeKey as Mode);
              }}
            />
          }
        />
      </div>
    </div>
  );
};
export default TranslatePage;
