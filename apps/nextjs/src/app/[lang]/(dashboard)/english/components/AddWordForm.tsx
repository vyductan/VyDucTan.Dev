"use client";

import { useState } from "react";

import type {
  WordCEFRLevel,
  WordClass,
  WordMastery,
} from "@vyductan/api/types";
import type { RadioOption } from "@vyductan/ui";
import { insertWordDefinitionSchema } from "@vyductan/api/types";
import { AutoForm, Button, Modal, toast, useForm } from "@vyductan/ui";

import { api } from "~/trpc/react";

export const AddWordForm = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const form = useForm({
    schema: insertWordDefinitionSchema,
    defaultValues: {
      examples: [""],
      mastery: "1",
    },
    onSubmit: async (values) => {
      addWord.mutate(values);
    },
  });

  const utils = api.useUtils();
  const addWord = api.english.create.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      setIsAddModalOpen(false);
      await utils.english.all.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
      // form.setError(error)
    },
  });

  return (
    <Modal
      open={isAddModalOpen}
      title="Add Vocabulary"
      className="w-screen-md"
      trigger={
        <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
          Add
        </Button>
      }
      onOk={form?.submit}
      onCancel={() => {
        setIsAddModalOpen(false);
      }}
    >
      <AutoForm
        form={form}
        fields={[
          {
            type: "text",
            name: "word",
            label: "Word Name",
            placeholder: "Enter the word name",
          },
          {
            type: "radio-group",
            name: "class",
            label: "Class",
            options: [
              {
                value: "",
                label: "None",
              },
              {
                value: "noun",
                label: "Noun",
              },
              {
                value: "verb",
                label: "Verb",
              },
              {
                value: "adj",
                label: "Adjective",
              },
              {
                value: "adv",
                label: "Adverb",
              },
            ] satisfies RadioOption<WordClass>[],
          },
          {
            type: "text",
            name: "ipaUk",
            label: "IPA (UK)",
            placeholder: "Enter the IPA (UK)",
          },
          {
            type: "text",
            name: "ipaUs",
            label: "IPA (US)",
            placeholder: "Enter the IPA (US)",
          },
          {
            type: "radio-group",
            name: "cefrLevel",
            label: "CEFR Level",
            options: [
              {
                value: "",
                label: "None",
              },
              {
                value: "a1",
                label: "A1",
              },
              {
                value: "a2",
                label: "A2",
              },
              {
                value: "b1",
                label: "B1",
              },
              {
                value: "b2",
                label: "B2",
              },
              {
                value: "c1",
                label: "C1",
              },
              {
                value: "c2",
                label: "C2",
              },
            ] satisfies RadioOption<WordCEFRLevel>[],
          },
          {
            type: "text",
            name: "english",
            label: "English",
            placeholder: "Meaning of the word in English",
          },
          {
            type: "text",
            name: "vietnamese",
            label: "Vietnamese",
            placeholder: "Meaning of the word in Vietnamese",
          },
          {
            type: "list",
            name: "examples",
            appendProps: {
              title: "Add new example",
            },
            fields: [
              {
                type: "text",
                name: "",
                placeholder: "Enter example",
              },
            ],
          },
          {
            type: "radio-group",
            name: "mastery",
            label: "Mastery",
            options: [
              {
                value: "1",
                label: "*",
              },
              {
                value: "2",
                label: "**",
              },
              {
                value: "3",
                label: "***",
              },
              {
                value: "4",
                label: "****",
              },
              {
                value: "5",
                label: "*****",
              },
            ] satisfies RadioOption<WordMastery>[],
          },
        ]}
      />
    </Modal>
  );
};
