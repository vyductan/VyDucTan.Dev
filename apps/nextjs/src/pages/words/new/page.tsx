import { createRoute, useNavigate } from "@tanstack/react-router";
import { message, Modal } from "antd";

import type { RouterInputs } from "@acme/api";
import { useForm } from "@acme/ui/antd/form";

import { api } from "~/trpc/react";
import { WordForm } from "../_components/WordForm";
import { wordsRoute } from "../pages";

const WordNewPage = () => {
  const navigate = useNavigate();
  const searchParams = wordsRoute.useSearch();
  const utils = api.useUtils();
  const addWord = api.words.create.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      // onCancel();
      await utils.words.all.invalidate();
    },
    onError: (error) => {
      void message.error(error.message);
      // form.setError(error)
    },
  });

  const form = useForm<RouterInputs["words"]["create"]>({
    onSubmit: (values) => addWord.mutate(values),
  });
  return (
    <Modal
      open
      onOk={form.submit}
      onCancel={() => navigate({ to: "../", search: searchParams })}
    >
      <WordForm form={form} />
    </Modal>
  );
};

export const wordNewRoute = createRoute({
  getParentRoute: () => wordsRoute,
  path: "new",
  component: WordNewPage,
});
