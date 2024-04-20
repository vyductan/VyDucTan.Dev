import { createRoute } from "@tanstack/react-router";
import { Modal } from "antd";

import { AddWordMutation } from "@acme/graphql/models/words";
import { useForm } from "@acme/ui/antd/form";

import { useMutation } from "~/hooks/useMutation";
import { WordForm } from "../_components/form";
import { wordsRoute } from "../pages";

const WordNew = () => {
  const { mutate } = useMutation({
    // mutationKey: ["addWord"],
    mutationFn: AddWordMutation,
  });

  const form = useForm({
    onSubmit: mutate,
  });
  return (
    <Modal open={true} onOk={form.submit}>
      <WordForm form={form} />
    </Modal>
  );
};

export const wordAddRoute = createRoute({
  getParentRoute: () => wordsRoute,
  path: "new",
  component: WordNew,
});
