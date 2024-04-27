import { createRoute, useNavigate } from "@tanstack/react-router";
import { Modal } from "antd";

import type { RouterInputs } from "@acme/api";
import { useForm } from "@acme/ui/antd/form";

import { api } from "~/libs/trpc/react";
import { WordForm } from "../_components/WordForm";
import { wordsRoute } from "../page";

const WordNew = () => {
  const navigate = useNavigate();
  const addWord = api.words.create.useMutation();

  const form = useForm<RouterInputs["words"]["create"]>({
    onSubmit: (values) => addWord.mutate(values),
  });
  return (
    <Modal
      open={true}
      onOk={form.submit}
      onCancel={() => navigate({ to: "../" })}
    >
      <WordForm form={form} />
    </Modal>
  );
};

export const wordAddRoute = createRoute({
  getParentRoute: () => wordsRoute,
  path: "new",
  component: WordNew,
});
