"use client";

import { Field, Form, useForm } from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { Modal } from "@acme/ui/modal";
import { Select } from "@acme/ui/select";
import { Tag } from "@acme/ui/tag";

import type { Word, WordAddValues, WordDbInfo } from "../types";
import { api } from "~/trpc/react";

type EnglishFormProps = {
  initialValues: Word | undefined;
  dbInfo: WordDbInfo;
  onOpenChange: (open: boolean) => void;
};
export const EnglishForm = ({
  initialValues,
  dbInfo,
  onOpenChange,
}: EnglishFormProps) => {
  const utils = api.useUtils();
  const insertMutation = api.english.notion.insert.useMutation({
    onSuccess: async () => {
      await utils.english.invalidate();
      onOpenChange(false);
    },
  });
  const updateMutation = api.english.notion.update.useMutation({
    onSuccess: async () => {
      await utils.english.invalidate();
      onOpenChange(false);
    },
  });

  const form = useForm<Partial<WordAddValues>>({
    defaultValues: {
      word: initialValues?.properties["Words/Phrases"].title[0]?.text.content,
      ipa: initialValues?.properties.IPA.rich_text[0]?.plain_text,
      gram: initialValues?.properties.Gram.select?.name,
      level: initialValues?.properties.Level.select?.name,
      english: initialValues?.properties.English.rich_text[0]?.plain_text,
      vietnamese: initialValues?.properties.Vietnamese.rich_text[0]?.plain_text,
      examples: initialValues?.properties.Examples.rich_text[0]?.plain_text,
    },
    onSubmit: (values) => {
      const transformed = {
        "Words/Phrases": {
          title: values.word
            ? [
                {
                  text: {
                    content: values.word,
                  },
                },
              ]
            : [],
        },
        IPA: {
          rich_text: values.ipa
            ? [
                {
                  text: {
                    content: values.ipa,
                  },
                },
              ]
            : [],
        },
        English: {
          rich_text: values.english
            ? [
                {
                  text: {
                    content: values.english,
                  },
                },
              ]
            : [],
        },
        Vietnamese: {
          rich_text: values.vietnamese
            ? [
                {
                  text: {
                    content: values.vietnamese,
                  },
                },
              ]
            : [],
        },
        Examples: {
          rich_text: values.examples
            ? [
                {
                  text: {
                    content: values.examples,
                  },
                },
              ]
            : [],
        },
        Gram: {
          select: values.gram
            ? {
                name: values.gram,
              }
            : null,
        },
        Level: {
          select: values.level
            ? {
                name: values.level,
              }
            : null,
        },
      };

      if (!initialValues) {
        insertMutation.mutate({
          ...transformed,
        });
      } else {
        updateMutation.mutate({
          ...transformed,
          id: initialValues.id,
        });
      }
    },
  });
  return (
    <Modal
      open
      onOk={() => {
        void form.submit();
      }}
      title={`${initialValues ? "Edit" : "Add"} Words/Phrases`}
      onOpenChange={onOpenChange}
      okLoading={insertMutation.isPending || updateMutation.isPending}
    >
      <Form form={form}>
        <Field label="Words/Phrases" name="word">
          <Input />
        </Field>
        <div className="grid grid-cols-3 gap-6">
          <Field label="IPA" name="ipa">
            <Input />
          </Field>
          <Field label="Level" name="level">
            <Select
              options={dbInfo.properties.Level.select.options.map((o) => {
                return {
                  label: (
                    <Tag style={{ backgroundColor: o.color }}>{o.name}</Tag>
                  ),
                  value: o.name,
                };
              })}
            />
          </Field>
          <Field label="Gram" name="gram">
            <Select
              options={dbInfo.properties.Gram.select.options.map((o) => {
                return {
                  label: (
                    <Tag style={{ backgroundColor: o.color }}>{o.name}</Tag>
                  ),
                  value: o.name,
                };
              })}
            />
          </Field>
        </div>

        <Field label="English" name="english">
          <Input />
        </Field>

        <Field label="Vietnamese" name="vietnamese">
          <Input />
        </Field>

        <Field label="Examples" name="examples">
          <Input />
        </Field>
      </Form>
    </Modal>
  );
};
