import type { TableColumnDef } from "@acme/ui/table";
import { Table } from "@acme/ui/table";
import { Tag } from "@acme/ui/tag";
import { message } from "@acme/ui/toast";

import type { Word, WordDbInfo } from "../types";
import { ButtonActions, ButtonDelete, ButtonEdit } from "~/components/button";
import { renderNotionRichText } from "~/libs/notion/utils";
import { api } from "~/trpc/react";

type WordsTableProps = {
  dataSource: Word[];
  onEditClick: (record: Word) => void;
  dbInfo: WordDbInfo;
};
export const WordsTable = ({
  dataSource,
  onEditClick,
  dbInfo,
}: WordsTableProps) => {
  const utils = api.useUtils();
  const deleteMutation = api.english.notion.delete.useMutation({
    onSettled: async (data, error) => {
      if (data) {
        message.success("Word deleted successfully!");
        await utils.english.invalidate();
      } else {
        message.error(error?.message ?? "Unexpected error, Please try again");
      }
    },
  });

  const columns: TableColumnDef<Word>[] = [
    {
      title: dbInfo.properties["Words/Phrases"].name,
      render: ({ record }) => {
        return (
          <>
            <div className="mb-1 font-semibold">
              {record.properties["Words/Phrases"].title[0]?.plain_text}
            </div>
            {record.properties.IPA.rich_text.length > 0 && (
              <div>
                {record.properties.IPA.rich_text.map((t) => (
                  <div>{t.plain_text}</div>
                ))}
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Tags",
      width: 400,
      render: ({ record }) => {
        return (
          <>
            <div className="flex flex-col gap-2">
              {record.properties.Gram.select && (
                <Tag style={{ color: record.properties.Gram.select.color }}>
                  {record.properties.Gram.select.name}
                </Tag>
              )}
              {record.properties.Level.select && (
                <Tag style={{ color: record.properties.Level.select.color }}>
                  {record.properties.Level.select.name}
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
        return renderNotionRichText(record.properties.Examples.rich_text);
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
    {
      title: <span className="sr-only">Actions</span>,
      width: 150,
      render: ({ record }) => {
        return (
          <ButtonActions
            dropdown={[
              {
                label: "Sửa",
                onSelect: () => {
                  onEditClick(record);
                },
              },
            ]}
          >
            <ButtonEdit
              onClick={() => {
                onEditClick(record);
              }}
            />
            <ButtonDelete
              title="Delete word"
              description="Are you sure you want to delete this word?"
              okLoading={
                deleteMutation.isPending &&
                deleteMutation.variables.id === record.id
              }
              onConfirm={() => {
                deleteMutation.mutate({ id: record.id });
              }}
            />
          </ButtonActions>
        );
      },
    },
  ];

  return (
    <>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />
    </>
  );
};
