"use client";

/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback, useEffect, useRef, useState } from "react";

import type { LangCode } from "../lang";
import type { TTSProvider } from "../tts/types";
import { defaultTTSProvider, doSpeak } from "../tts";
import { SpeakerMotion } from "./speaker-motion";

import "./index.css";

import { Icon } from "@acme/ui/icons";

interface ISpeakerIconProps {
  divRef?: React.Ref<HTMLDivElement>;
  provider?: TTSProvider;
  lang?: LangCode;
  voice?: string;
  rate?: number;
  volume?: number;
  text?: string;
  className?: string;
}

export function SpeakerIcon({
  divRef,
  provider = defaultTTSProvider,
  text,
  lang = "en",
  voice,
  rate,
  volume,
  className,
}: ISpeakerIconProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const stopRef = useRef<() => void>();

  useEffect(() => {
    return () => {
      stopRef.current?.();
    };
  }, []);

  const handleSpeak = useCallback(() => {
    if (!text) {
      return;
    }
    setIsLoading(true);
    setIsSpeaking(true);
    const controller = new AbortController();
    const { signal } = controller;
    stopRef.current = () => {
      controller.abort();
      setIsSpeaking(false);
      setIsLoading(false);
    };

    let supportVoices: SpeechSynthesisVoice[] = [];
    window.speechSynthesis.onvoiceschanged = () => {
      supportVoices = speechSynthesis.getVoices();
    };

    doSpeak({
      supportVoices,
      provider,
      lang,
      text,
      voice,
      volume,
      rate,
      onFinish: () => {
        console.log("onFinish");
        setIsSpeaking(false);
      },
      onStartSpeaking: () => {
        console.log("onStartSpeaking");
        setIsLoading(false);
      },
      signal,
    });
  }, [lang, provider, rate, text, voice, volume]);

  return (
    <>
      <div
        ref={divRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isSpeaking || isLoading) {
            stopRef.current?.();
            return;
          }
          handleSpeak();
        }}
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={className}
      >
        {!isLoading ? (
          <>
            <SpeakerMotion hidden={!isSpeaking} size="sm" />
            <Icon
              style={{
                display: isSpeaking ? "none" : "block",
              }}
              icon="wpf:speaker"
              className="cursor-pointer"
            />
          </>
        ) : (
          <div className="speaker-loader" />
        )}
      </div>
    </>
  );
}
