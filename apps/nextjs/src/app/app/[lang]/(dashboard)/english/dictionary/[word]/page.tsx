"use client";

import { clsm } from "@acme/ui";
import { Button } from "@acme/ui/antd/button";
import { PageContainer } from "@acme/ui/pro/page-container";

import { SpeakerIcon } from "~/libs/tts";
import { api } from "~/trpc/react";
import { cerfLevelOptions } from "../../words/config";
import { DictionaryWordRoute } from "./routeDef";

export default function WordDetailPage() {
  const { word } = DictionaryWordRoute.useParams();

  const wordQuery = api.words.byCambridge.useQuery({ word });

  return (
    <PageContainer>
      {wordQuery.isLoading
        ? "Loading"
        : !wordQuery.data
          ? "No Data"
          : wordQuery.data.map((data, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <span>{data.word}</span>
                    <span>{data.pos}</span>
                  </div>
                  <Button>Add word to learning list</Button>
                </div>
                <div>
                  {
                    cerfLevelOptions.find((x) => x.value === data.cefrLevel)
                      ?.label
                  }
                </div>
                <div>{data.definition}</div>
                <ul className="list-inside list-disc">
                  {data.examples.map((x, idx) => (
                    <li key={idx} className="relative flex">
                      <SpeakerIcon
                        className="absolute left-0 top-[3px] size-3.5"
                        text={x.text}
                      />
                      <span className="indent-5 font-bold">{x.highlight}</span>
                      <span
                        className={clsm(
                          "ml-2",
                          !x.highlight && "ml-0 indent-5",
                        )}
                      >
                        {x.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
    </PageContainer>
  );
}
