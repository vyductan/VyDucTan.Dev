import { useEffect } from "react";

import type {
  WordCEFRLevel,
  WordClass,
  WordMastery,
} from "@vyductan/api/types";
import type { RadioOption } from "@vyductan/ui/radio";
import { insertWordDefinitionSchema } from "@vyductan/api/types";
import { AutoForm, useForm } from "@vyductan/ui/form";
import { Modal } from "@vyductan/ui/modal";
import { Spin } from "@vyductan/ui/spin";
import { message } from "@vyductan/ui/toast";

import { api } from "~/trpc/react";

type Props = {
  id: string | undefined;
  isOpen: boolean;
  onCancel: () => void;
  onOpenChange: (open: boolean) => void;
};
export const WordModalForm = ({
  id,
  isOpen,
  onCancel,
  onOpenChange,
}: Props) => {
  const utils = api.useUtils();

  const { data: word, isPending } = api.english.byId.useQuery(
    {
      id: id!,
    },
    {
      enabled: !!id,
    },
  );
  const addWord = api.english.create.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      onCancel();
      await utils.english.all.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
      // form.setError(error)
    },
  });
  const updateWord = api.english.update.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      onCancel();
      await utils.english.all.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
      // form.setError(error)
    },
  });

  const form = useForm({
    schema: insertWordDefinitionSchema,
    defaultValues: {
      examples: [""],
      mastery: "1",
    },
    onSubmit: async (values) => {
      !id
        ? addWord.mutate(values)
        : updateWord.mutate({
            ...values,
            id,
          });
    },
  });
  const { setFieldsValue, resetFields } = form;
  useEffect(() => {
    if (word) {
      setFieldsValue(word);
    } else {
      resetFields();
    }
  }, [word, setFieldsValue, resetFields]);

  return (
    <>
      <Modal
        open={isOpen}
        title={`${!id ? "Add" : "Edit"} Vocabulary`}
        className="w-screen-md"
        onOk={form?.submit}
        onCancel={() => {
          onCancel();
        }}
        onOpenChange={onOpenChange}
      >
        {/* Should unmount form when hide modal */}
        {!isOpen ? null : id && isPending ? (
          <>
            <Spin />
          </>
        ) : (
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
                  {
                    value: "phrase",
                    label: "Phrase",
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
                type: "text",
                name: "relatedWords",
                label: "Related Words",
                placeholder: "Related words with the word",
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
        )}
      </Modal>
    </>
  );
};
