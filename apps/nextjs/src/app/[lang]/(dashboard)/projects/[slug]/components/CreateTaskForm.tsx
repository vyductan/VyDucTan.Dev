"use client";

import { useState } from "react";

import { insertTaskSchema } from "@vyductan/api/types";
import { AutoForm, Button, Modal, useForm } from "@vyductan/ui";

import { api } from "~/trpc/react";

type CreateTaskFormProps = {
  projectId: string;
};
export const CreateTaskForm = ({ projectId }: CreateTaskFormProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const form = useForm({
    validationSchema: insertTaskSchema,
    defaultValues: {
      projectId,
    },
    onSubmit: async (values) => {
      await addTask(values);
      await utils.projects.bySlug.invalidate();
    },
  });

  const utils = api.useUtils();
  const { mutateAsync: addTask, isPending } = api.projects.addTask.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      setIsCreateModalOpen(false);
      await utils.projects.bySlug.invalidate();
    },
    onError: (error) => {
      console.log("error", error);
      // form.setError(error)
    },
  });

  return (
    <Modal
      open={isCreateModalOpen}
      title="Add a new Task"
      className="w-screen-md"
      trigger={
        <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
          Add
        </Button>
      }
      okLoading={isPending}
      onOk={form.submit}
      onCancel={() => {
        setIsCreateModalOpen(false);
      }}
    >
      <AutoForm
        form={form}
        fields={[
          {
            type: "text",
            name: "name",
            label: "Name",
            placeholder: "Enter the project name",
          },
        ]}
      />
    </Modal>
  );
};
