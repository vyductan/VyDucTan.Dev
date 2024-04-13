import type { LangCode } from "../lang";

export interface SpeakOptions {
  text: string;
  lang?: LangCode;
  signal: AbortSignal;
  onFinish?: () => void;
  onStartSpeaking?: () => void;
}

export type TTSProvider = "WebSpeech" | "EdgeTTS";

export interface DoSpeakOptions extends SpeakOptions {
  supportVoices: SpeechSynthesisVoice[];
  lang: LangCode;
  provider: TTSProvider;
  voice?: string;
  rate?: number;
  volume?: number;
}
