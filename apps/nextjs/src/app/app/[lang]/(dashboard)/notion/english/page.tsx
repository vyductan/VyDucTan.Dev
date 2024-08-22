"use client";

import { useState } from "react";

import { Button } from "@acme/ui/button";
import { Card } from "@acme/ui/card";
import { Icon } from "@acme/ui/icons";
import { PageContainer } from "@acme/ui/pro/page-container";

import type { Word, WordDbInfo } from "./types";
import { api } from "~/trpc/react";
import { EnglishForm } from "./_components/EnglishForm";
import { PracticeModal } from "./_components/PracticeModal";
import { WordsTable } from "./_components/WordsTable";

export default function NotionEnglishPage() {
  const [isInsertOpen, setIsInsertOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<Word>();
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);

  const englishQuery = api.english.notion.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const isLoading = !englishQuery.data;
  if (isLoading) return null;

  const { info, data } = englishQuery.data;
  const dbInfo = info as unknown as WordDbInfo;
  const dataSource = data.results as unknown as Word[];

  return (
    <PageContainer>
      <Card
        title="English"
        extra={
          <div className="flex gap-2">
            <Button
              className="ml-auto"
              icon={
                <Icon icon="icon-[healthicons--i-exam-multiple-choice-outline]" />
              }
              onClick={() => setIsPracticeModalOpen(true)}
            >
              Practice
            </Button>
            <Button
              icon={<Icon icon="icon-[gg--add]" />}
              onClick={() => setIsInsertOpen(true)}
            >
              Add
            </Button>
          </div>
        }
      >
        <WordsTable
          dataSource={dataSource}
          onEditClick={(record) => {
            setCurrentRow(record);
          }}
          dbInfo={dbInfo}
        />
        {(isInsertOpen || currentRow) && (
          <EnglishForm
            initialValues={currentRow}
            dbInfo={dbInfo}
            onOpenChange={(open) => {
              setCurrentRow(undefined);
              setIsInsertOpen(open);
            }}
          />
        )}

        <PracticeModal
          open={isPracticeModalOpen}
          onOpenChange={setIsPracticeModalOpen}
        />
      </Card>
    </PageContainer>
  );
}
