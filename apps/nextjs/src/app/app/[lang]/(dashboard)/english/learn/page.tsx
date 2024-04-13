"use client";

import { Fragment, useEffect, useState } from "react";
import _ from "lodash";

import { WordMastery } from "@acme/api/types/english";
import { Button } from "@acme/ui/button";
import { AutoForm, useForm } from "@acme/ui/form";
import { PageContainer } from "@acme/ui/pro/page-container";
import { Spin } from "@acme/ui/spin";
import { message } from "@acme/ui/toast";

import { api } from "~/trpc/react";

export default function EnglishLearnPage() {
  const {
    data: currentWord,
    isLoading,
    refetch,
  } = api.english.getWordToLearn.useQuery(void 0, {
    enabled: false,
  });
  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [question, setQuestion] = useState<string[]>([]);
  useEffect(() => {
    if (currentWord) {
      document.title = `English learning: ${currentWord.word}`;
      const randomExample = _.sample(currentWord.examples)!;
      setQuestion(randomExample.split(" "));
    }
  }, [currentWord]);

  const masteryWord = api.english.mastery.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      input: "",
    },
    onSubmit: (values) => {
      if (values.input === currentWord?.word) {
        masteryWord.mutate({
          id: currentWord.id,
          mastery: (Number(currentWord.mastery) + 1).toString() as WordMastery,
        });
        message.success("Correctly");
      } else {
        message.error("Wrong answer, Please try again");
      }
    },
  });

  return (
    <PageContainer>
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        {!isLoading && currentWord ? (
          <>
            <div>
              {question.map((w, i) => (
                <Fragment key={i}>
                  {[
                    currentWord.word,
                    ...(currentWord.relatedWords ?? "").split(","),
                  ].find((rw) => rw === w) ? (
                    <b>{w}</b>
                  ) : (
                    w
                  )}
                  {i === question.length - 1 ? "" : " "}
                </Fragment>
              ))}
            </div>
            <AutoForm
              className="w-1/2"
              form={form}
              fields={[
                {
                  type: "text",
                  name: "input",
                },
                {
                  type: "custom",
                  render: () => (
                    <div className="flex gap-2">
                      <Button primary type="submit" className="w-full">
                        Check
                      </Button>
                      <Button
                        onClick={() => {
                          if (currentWord.mastery !== "1") {
                            masteryWord.mutate({
                              id: currentWord.id,
                              mastery: (
                                Number(currentWord.mastery) - 1
                              ).toString() as WordMastery,
                            });
                          }
                          void refetch();
                        }}
                      >
                        Next word
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          </>
        ) : (
          <Spin />
        )}
      </div>
    </PageContainer>
  );
}
