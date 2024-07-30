"use client";

import type { EnglishAdd } from "@acme/api/english";
import { Field, Form, useForm } from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { Modal } from "@acme/ui/modal";
import { Select } from "@acme/ui/select";
import { Tag } from "@acme/ui/tag";

import { api } from "~/trpc/react";

type EnglishFormProps = {
  initialValues: EnglishAdd | undefined;
  dbInfo: any;
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

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: (values: any) => {
      insertMutation.mutate({
        "Words/Phrases": {
          title: [
            {
              text: {
                content: values.word,
              },
            },
          ],
        },
        IPA: {
          rich_text: [
            {
              text: {
                content: values.word,
              },
            },
          ],
        },
        English: {
          rich_text: [
            {
              text: {
                content: values.english,
              },
            },
          ],
        },
        Vietnamese: {
          rich_text: [
            {
              text: {
                content: values.vietnamese,
              },
            },
          ],
        },
        Example: {
          rich_text: [
            {
              text: {
                content: values.example,
              },
            },
          ],
        },
        Gram: {
          select: {
            name: values.gram,
          },
        },
        Level: {
          select: {
            name: values.level,
          },
        },
      });
    },
  });
  return (
    <Modal
      open
      onOk={() => {
        form.submit();
      }}
      title={`${initialValues ? "Edit" : "Add"} Words/Phrases`}
      onOpenChange={onOpenChange}
      okLoading={insertMutation.isPending}
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
              options={dbInfo.properties.Level?.select.options.map((o) => {
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
              options={dbInfo.properties.Gram?.select.options.map((o) => {
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

        <Field label="Example" name="example">
          <Input />
        </Field>
      </Form>
    </Modal>
  );
};
