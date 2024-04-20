import { Form, Input, Select } from "antd";

import type { AddWordMutation } from "@acme/graphql/models/words";
import type { FormInstance } from "@acme/ui/antd/form";
import { FormItem } from "@acme/ui/antd/form";

import type { MutationVariablesOf } from "~/libs/urql/types";

type WordFormProps = {
  form: FormInstance<
    MutationVariablesOf<typeof AddWordMutation>,
    unknown,
    MutationVariablesOf<typeof AddWordMutation>
  >;
};
export const WordForm = ({ form }: WordFormProps) => {
  return (
    <Form onFinish={form.submit}>
      <FormItem control={form.control} name="word" label="Word">
        <Input />
      </FormItem>
      <FormItem control={form.control} name="english" label="English">
        <Input />
      </FormItem>
      <FormItem control={form.control} name="vietnamese" label="Vietnamese">
        <Input />
      </FormItem>
      <FormItem control={form.control} name="examples" label="Examples">
        <Input placeholder="Enter word" />
      </FormItem>
      {/* <FormItem control={form.control} name="cefrLevel" label="CEFR Level"> */}
      {/*   <Select options={[]}/> */}
      {/* </FormItem> */}
    </Form>
  );
};
