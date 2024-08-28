"use client";

import { message, Modal } from "antd";

import type { RouterInputs } from "@acme/api";
import { useForm } from "@acme/ui/antd/form";

import { api } from "~/trpc/react";
import { WordForm } from "../_components/WordForm";
import { WordNewRoute } from "./routeDef";

export default function WordNewPage() {
  const navigate = WordNewRoute.useNavigate();
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
      onCancel={() =>
        navigate({ to: "/english/words", search: (prev) => prev })
      }
    >
      <WordForm form={form} />
    </Modal>
  );
}
