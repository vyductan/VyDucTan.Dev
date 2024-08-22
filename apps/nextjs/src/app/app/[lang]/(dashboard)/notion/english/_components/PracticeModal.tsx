import { useEffect, useState } from "react";
import _ from "lodash";

import { Button } from "@acme/ui/button";
import { Modal } from "@acme/ui/modal";
import { Tag } from "@acme/ui/tag";
import { notification } from "@acme/ui/toast";
import { Tooltip } from "@acme/ui/tooltip";

import type { Word } from "../types";
import { renderNotionRichText } from "~/libs/notion/utils";
import { api } from "~/trpc/react";

type PracticeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export const PracticeModal = ({ open, onOpenChange }: PracticeModalProps) => {
  const practicesQuery = api.english.notion.practices.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const [currentWord, setCurrentWord] = useState<Word>();

  const updateMasteryWord = api.english.notion.updateMastery.useMutation({
    onSuccess: async () => {
      // await refetch();
      // message.success("Updated");
    },
    onError: (error) => {
      notification.error(error.message);
    },
  });

  const practiceWords = practicesQuery.data?.results as unknown as
    | Word[]
    | undefined;

  useEffect(() => {
    if (practiceWords) {
      const randomWord = _.sample(practiceWords)!;
      setCurrentWord(randomWord);
      document.title = `English learning: ${randomWord.properties["Words/Phrases"].title[0]?.plain_text}`;
    }
  }, [practiceWords]);

  return (
    <Modal title="Practice" open={open} onOpenChange={onOpenChange}>
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <div className="text-5xl font-extrabold">
          <Tooltip
            title={
              <div className="flex flex-col gap-1 font-normal">
                <div className="font-bold">
                  {
                    currentWord?.properties["Words/Phrases"].title[0]
                      ?.plain_text
                  }
                </div>
                <div>
                  {currentWord?.properties.IPA.rich_text[0]?.plain_text}
                </div>

                {currentWord?.properties.Gram.select?.name && (
                  <Tag
                    style={{ color: currentWord.properties.Gram.select.color }}
                  >
                    {currentWord.properties.Gram.select.name}
                  </Tag>
                )}
                {currentWord?.properties.Level.select?.name && (
                  <Tag
                    style={{ color: currentWord.properties.Level.select.color }}
                  >
                    {currentWord.properties.Level.select.name}
                  </Tag>
                )}
                <div>
                  {currentWord?.properties.English.rich_text[0]?.plain_text}
                </div>
                <div>
                  {currentWord?.properties.Vietnamese.rich_text[0]?.plain_text}
                </div>
                <div>
                  {currentWord?.properties.Examples.rich_text
                    ? renderNotionRichText(
                        currentWord.properties.English.rich_text,
                      )
                    : ""}
                </div>
                {currentWord?.properties.Mastery.select?.name && (
                  <Tag
                    style={{
                      color: currentWord.properties.Mastery.select.color,
                    }}
                  >
                    {currentWord.properties.Mastery.select.name}
                  </Tag>
                )}
              </div>
            }
          >
            <div>
              {currentWord?.properties["Words/Phrases"].title[0]?.plain_text}
            </div>
          </Tooltip>
        </div>
        <div className="mt-6 flex w-[480px] gap-6">
          <Button
            className="w-full"
            variant="outline"
            // loading={updateMasteryWord.isPending}
            onClick={() => {
              const randomWord = _.sample(practiceWords)!;
              setCurrentWord(randomWord);
              document.title = `English learning: ${randomWord.properties["Words/Phrases"].title[0]?.plain_text}`;
              updateMasteryWord.mutate({
                id: currentWord?.id ?? "",
                mastery: (
                  Number(currentWord?.properties.Mastery.select?.name) - 1
                ).toString(),
              });
            }}
          >
            Ignore
          </Button>
          <Button
            className="w-full"
            // loading={updateMasteryWord.isPending}
            onClick={() => {
              const randomWord = _.sample(practiceWords)!;
              setCurrentWord(randomWord);
              document.title = `English learning: ${randomWord.properties["Words/Phrases"].title[0]?.plain_text}`;
              updateMasteryWord.mutate({
                id: currentWord?.id ?? "",
                mastery: (
                  Number(currentWord?.properties.Mastery.select?.name) + 1
                ).toString(),
              });
            }}
          >
            Next
          </Button>
        </div>
        {/* {!practicesQuery.isLoading && currentWord ? ( */}
        {/*   <> */}
        {/*     <div> */}
        {/*       {question.map((w, i) => ( */}
        {/*         <Fragment key={i}> */}
        {/*           {[ */}
        {/*             currentWord.word, */}
        {/*             ...(currentWord.relatedWords ?? "").split(","), */}
        {/*           ].find((rw) => rw === w) ? ( */}
        {/*             <b>{w}</b> */}
        {/*           ) : ( */}
        {/*             w */}
        {/*           )} */}
        {/*           {i === question.length - 1 ? "" : " "} */}
        {/*         </Fragment> */}
        {/*       ))} */}
        {/*     </div> */}
        {/*     <AutoForm */}
        {/*       className="w-1/2" */}
        {/*       form={form} */}
        {/*       fields={[ */}
        {/*         { */}
        {/*           type: "text", */}
        {/*           name: "input", */}
        {/*         }, */}
        {/*         { */}
        {/*           type: "custom", */}
        {/*           render: () => ( */}
        {/*             <div className="flex gap-2"> */}
        {/*               <Button primary type="submit" className="w-full"> */}
        {/*                 Check */}
        {/*               </Button> */}
        {/*               <Button */}
        {/*                 onClick={() => { */}
        {/*                   if (currentWord.mastery !== "1") { */}
        {/*                     updateMasteryWord.mutate({ */}
        {/*                       id: currentWord.id, */}
        {/*                       mastery: ( */}
        {/*                         Number(currentWord.mastery) - 1 */}
        {/*                       ).toString() as WordMastery, */}
        {/*                     }); */}
        {/*                   } */}
        {/*                   void refetch(); */}
        {/*                 }} */}
        {/*               > */}
        {/*                 Next word */}
        {/*               </Button> */}
        {/*             </div> */}
        {/*           ), */}
        {/*         }, */}
        {/*       ]} */}
        {/*     /> */}
        {/*   </> */}
        {/* ) : ( */}
        {/*   <Spin /> */}
        {/* )} */}
      </div>
    </Modal>
  );
};
