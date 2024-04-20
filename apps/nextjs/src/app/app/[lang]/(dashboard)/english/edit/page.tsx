"use client";

import { useRouter } from "next/navigation";
import { message, Modal } from "antd";

import type { RouterInputs } from "@acme/api";
import { useForm } from "@acme/ui/antd/form";

import { api } from "~/trpc/react";
import { WordForm } from "../components/WordForm";

export default function WordEditPage() {
  const router = useRouter();
  const utils = api.useUtils();

  const { data: word, isPending } = api.words.byId.useQuery(
    {
      id: id ?? "",
    },
    {
      enabled: !!id,
    },
  );

  const updateWord = api.words.update.useMutation({
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

  const form = useForm<RouterInputs["words"]["update"]>({
    onSubmit: (values) => updateWord.mutate(values),
  });
  return (
    <Modal open onOk={form.submit} onCancel={() => router.push("/english")}>
      <WordForm form={form} initialValues={word} />
    </Modal>
  );
}
