import type { RouterInputs } from "@acme/api";
import type { FormInstance } from "@acme/ui/antd/form";
import { AutoForm } from "@acme/ui/antd/form";

import {
  cerfLevelOptions,
  wordClassOptions,
  wordMasteryOptions,
} from "../config";

type WordFormProps = {
  form: FormInstance<
    RouterInputs["words"]["create"],
    unknown,
    RouterInputs["words"]["create"]
  >;
};
export const WordForm = ({ form }: WordFormProps) => {
  return (
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
          label: "Examples",
          appendProps: {
            title: "Add a new example",
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
              options: wordClassOptions,
            },
            {
              type: "select",
              name: "cefrLevel",
              label: "CEFR Level",
              showSearch: true,
              options: cerfLevelOptions,
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
          options: wordMasteryOptions,
        },
      ]}
    />
  );
};
