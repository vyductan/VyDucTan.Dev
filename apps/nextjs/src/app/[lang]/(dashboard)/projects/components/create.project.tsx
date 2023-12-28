"use client";

import type { CreateProjectParams } from "@vyductan/api/types";
import { useState } from "react";

import { insertProjectSchema } from "@vyductan/api/types";
import { AutoForm, Button, Modal, useForm } from "@vyductan/components";

import { api } from "~/trpc/react";

const CreateProjectForm = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const form = useForm<CreateProjectParams>();
  const utils = api.useUtils();

  const { mutateAsync: createTodo } = api.projects.create.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      setIsCreateModalOpen(false);
      await utils.projects.all.invalidate();
    },
    onError: (error) => {
      console.log("error", error);
      // form.setError(error)
    },
  });
  return (
    <Modal
      open={isCreateModalOpen}
      title="Add Vocabulary"
      className="w-screen-md"
      trigger={
        <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
          Add
        </Button>
      }
      onOk={form?.submit}
      onCancel={() => {
        setIsCreateModalOpen(false);
      }}
    >
      <AutoForm
        form={form}
        validationSchema={insertProjectSchema}
        defaultValues={{}}
        fields={[
          {
            type: "text",
            name: "name",
            label: "Name",
            placeholder: "Enter the project name",
          },
        ]}
        onSubmit={async (values) => {
          await createTodo(values);
        }}
      />
    </Modal>
  );
};

export default CreateProjectForm;
