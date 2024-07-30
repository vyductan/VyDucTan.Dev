"use client";

import { useState } from "react";

import type { EnglishAdd } from "@acme/api/english";
import type { TableColumnDef } from "@acme/ui/table";
import { Button } from "@acme/ui/button";
import { Icon } from "@acme/ui/icons";
import { PageContainer } from "@acme/ui/pro/page-container";
import { Table } from "@acme/ui/table";
import { Tag } from "@acme/ui/tag";

import { renderNotionRichText } from "~/libs/notion/utils";
import { api } from "~/trpc/react";
import { EnglishForm } from "./_components/EnglishForm";

export default function NotionEnglishPage() {
  const [isInsertOpen, setIsInsertOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<EnglishAdd>();

  const utils = api.useUtils();
  const englishQuery = api.english.notion.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  // const englishQuery = useQuery({
  //   queryKey: ["english"],
  //   queryFn: () => {
  //     return api.english.notion.list.useQuery();
  //   }
  // })
  const englishData = englishQuery.data;
  console.log("dddd", englishData);

  const isLoading = !englishQuery.data;
  if (isLoading) return null;

  const { info, data } = englishQuery.data;
  const dataSource = data.results;
  const columns: TableColumnDef<any>[] = [
    {
      title: info.properties["Words/Phrases"]?.name,
      render: ({ record }) => {
        return (
          <>
            <div className="mb-1 font-semibold">
              {record.properties["Words/Phrases"].title[0].plain_text}
            </div>
            <div className="flex gap-2">
              {record.properties.IPA.rich_text.length > 0 && (
                <div>
                  {record.properties.IPA.rich_text.map((t) => (
                    <div>{t.plain_text}</div>
                  ))}
                </div>
              )}
              {record.properties.Level.select && (
                <Tag style={{ color: record.properties.Level.select.color }}>
                  {record.properties.Level.select.name}
                </Tag>
              )}
              {record.properties.Gram.select && (
                <Tag style={{ color: record.properties.Gram.select.color }}>
                  {record.properties.Gram.select.name}
                </Tag>
              )}
            </div>
          </>
        );
      },
    },
    {
      title: "English",
      width: 400,
      render: ({ record }) => {
        return renderNotionRichText(record.properties.English.rich_text);
      },
    },
    {
      title: "Example",
      width: 400,
      render: ({ record }) => {
        return renderNotionRichText(record.properties.Example.rich_text);
      },
    },
    {
      title: "Vietnamese",
      width: 400,
      render: ({ record }) => {
        return renderNotionRichText(record.properties.Vietnamese.rich_text);
      },
    },
    {
      title: "Mastery",
      width: 100,
      render: ({ record }) => {
        return (
          record.properties.Mastery.select && (
            <Tag style={{ color: record.properties.Mastery.select.color }}>
              {record.properties.Mastery.select.name}
            </Tag>
          )
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Button
        icon={<Icon icon="icon-[gg--add]" />}
        onClick={() => setIsInsertOpen(true)}
      >
        Add
      </Button>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />
      {(isInsertOpen || currentRow) && (
        <EnglishForm
          initialValues={currentRow}
          dbInfo={info}
          onOpenChange={(open) => {
            setCurrentRow(undefined);
            setIsInsertOpen(open);
          }}
        />
      )}
    </PageContainer>
  );
}
