import { useEffect } from "react";
import { Modal } from "antd";

import type {
  WordCEFRLevel,
  WordClass,
  WordMastery,
} from "@acme/api/types/words";
import type { RadioOption } from "@acme/ui/radio";
import { insertWordSchema } from "@acme/api/types/words";
import { AutoForm, useForm } from "@acme/ui/antd/form";
import { Spin } from "@acme/ui/spin";
import { message } from "@acme/ui/toast";

import { api } from "~/trpc/react";

type Props = {
  id: string | undefined;
  isOpen: boolean;
  onCancel: () => void;
};
export const WordModalForm = ({ id, isOpen, onCancel }: Props) => {
  const utils = api.useUtils();

  const { data: word, isPending } = api.words.byId.useQuery(
    {
      id: id ?? "",
    },
    {
      enabled: !!id,
    },
  );
  const addWord = api.words.create.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      onCancel();
      await utils.words.all.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
      // form.setError(error)
    },
  });
  const updateWord = api.words.update.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      onCancel();
      await utils.words.all.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
      // form.setError(error)
    },
  });

  const form = useForm({
    schema: insertWordSchema,
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
        onOk={() => {
          form.submit(form.getValues());
        }}
        onCancel={() => {
          onCancel();
        }}
        // onOpenChange={onOpenChange}
      >
        {/* <Form form={form}> */}
        {/*   <FormItem control={form.control} name="word" label="Word Name"> */}
        {/*     <Input /> */}
        {/*   </FormItem> */}
        {/*   <FormItem control={form.control} name="word" label="Word Name"> */}
        {/*     <Select */}
        {/*       showSearch */}
        {/*       options={[ */}
        {/*         { */}
        {/*           value: "", */}
        {/*           label: "None", */}
        {/*         }, */}
        {/*         { */}
        {/*           value: "noun", */}
        {/*           label: "Noun", */}
        {/*         }, */}
        {/*         { */}
        {/*           value: "verb", */}
        {/*           label: "Verb", */}
        {/*         }, */}
        {/*         { */}
        {/*           value: "adj", */}
        {/*           label: "Adjective", */}
        {/*         }, */}
        {/*         { */}
        {/*           value: "adv", */}
        {/*           label: "Adverb", */}
        {/*         }, */}
        {/*         { */}
        {/*           value: "phrase", */}
        {/*           label: "Phrase", */}
        {/*         }, */}
        {/*       ]} */}
        {/*     /> */}
        {/*   </FormItem> */}
        {/*   <FormItem> */}
        {/*     <Button type="submit" /> */}
        {/*   </FormItem> */}
        {/* </Form> */}
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
                type: "group",
                columns: [
                  {
                    type: "select",
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
                    type: "select",
                    name: "cefrLevel",
                    label: "CEFR Level",
                    showSearch: true,
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
                ],
              },
              {
                type: "group",
                columns: [
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
                ],
              },

              {
                type: "text",
                name: "relatedWords",
                label: "Related Words",
                placeholder: "Related words with the word",
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
