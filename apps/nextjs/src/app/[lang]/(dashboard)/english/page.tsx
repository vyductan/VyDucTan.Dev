"use client";

import { useRef, useState } from "react";

import { Button, Tooltip } from "@vyductan/components";
import { PageContainer } from "@vyductan/components-pro";

import { speak } from "~/lib/tts/edge-tts";
import { useTranslation } from "~/locales/client";
import { AddWordForm } from "./components/AddWordForm";
import { WordTable } from "./components/WordTable";

export default function HomePage() {
  const { t } = useTranslation();

  const [isSpeakingTranslatedText, setIsSpeakingTranslatedText] =
    useState(false);

  const translatedStopSpeakRef = useRef<() => void>(() => null);

  const handleTranslatedSpeakAction = async () => {
    if (isSpeakingTranslatedText) {
      translatedStopSpeakRef.current();
      setIsSpeakingTranslatedText(false);
      return;
    }
    setIsSpeakingTranslatedText(true);
    const { stopSpeak } = await speak({
      text: "Hello",
      lang: "en-US",
      onFinish: () => setIsSpeakingTranslatedText(false),
    });
    translatedStopSpeakRef.current = stopSpeak;
  };

  return (
    <PageContainer
      header={{
        extra: <AddWordForm />,
      }}
    >
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <WordTable />
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
          <audio controls>
            <track kind="captions" />
            <source
              src="https://dictionary.cambridge.org/vi/media/english/uk_pron_ogg/u/uki/ukimp/ukimpet024.ogg"
              type="audio/ogg"
            />
            <source
              src="https://dictionary.cambridge.org/vi/media/english/uk_pron/u/uki/ukimp/ukimpet024.mp3"
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </h1>
        {/* <iframe src="https://viblo.asia/p/alpinejs-neu-react-la-qua-thua-yMnKMjaQZ7P" /> */}
        {/* <button */}
        {/*   onClick={async () => { */}
        {/*     const x = await axios.get( */}
        {/*       "/api/cambridge/search/amp", */}
        {/*       // "https://dictionary.cambridge.org/vi/autocomplete/amp", */}
        {/*       // { */}
        {/*       //   params: { */}
        {/*       //     dataset: "english", */}
        {/*       //     q: "implici", */}
        {/*       //     // __amp_source_origin: "https://dictionary.cambridge.org", */}
        {/*       //   }, */}
        {/*       // }, */}
        {/*       // "https://dictionary.cambridge.org/vi/autocomplete/amp?dataset=english&q=implici&__amp_source_origin=https%3A%2F%2Fdictionary.cambridge.org", */}
        {/*     ); */}
        {/*     console.log("x", x); */}
        {/*   }} */}
        {/* > */}
        {/*   asdasd */}
        {/* </button> */}

        <Tooltip title={t("Speak")} placement="bottom">
          <Button onClick={handleTranslatedSpeakAction}>
            {/* {isSpeakingTranslatedText ? ( */}
            {/*   <SpeakerMotion /> */}
            {/* ) : ( */}
            {/*   <RxSpeakerLoud size={15} /> */}
            {/* )} */}
            Speak
          </Button>
        </Tooltip>
      </div>
    </PageContainer>
  );
}
