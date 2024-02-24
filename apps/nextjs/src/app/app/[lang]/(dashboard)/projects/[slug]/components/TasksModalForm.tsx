"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { insertTaskSchema } from "@vyductan/api/types";
import { AutoForm, useForm } from "@vyductan/ui/form";
import { Modal } from "@vyductan/ui/modal";
import { Spin } from "@vyductan/ui/spin";
import { message } from "@vyductan/ui/toast";

import { upload } from "~/lib/upload";
import { api } from "~/trpc/react";

type TasksModalFormProps = {
  id?: string;
  projectId: string;
  title: string;
  trigger: ReactNode;
};
export const TasksModalForm = ({
  id,
  projectId,
  title,
  trigger,
}: TasksModalFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const utils = api.useUtils();
  const { data, isLoading } = api.tasks.byId.useQuery(
    {
      id: id!,
    },
    {
      // fix: load all taskById before show edit form
      enabled: !!id && isModalOpen,
    },
  );
  const addTask = api.tasks.create.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      setIsModalOpen(false);
      await utils.projects.bySlug.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
      // form.setError(error)
    },
  });
  const updateTask = api.tasks.update.useMutation({
    onSuccess: async () => {
      // form.reset();
      // setTitle("");
      // setContent("");
      await utils.projects.all.invalidate();
    },
    onError: (error) => {
      message.error(error.message);
      // form.setError(error)
    },
  });

  const form = useForm({
    schema: insertTaskSchema,
    defaultValues: {
      projectId,
    },
    onSubmit: async (values) => {
      !id
        ? addTask.mutate(values)
        : updateTask.mutate({
            ...values,
            id,
          });
      await utils.projects.bySlug.invalidate();
    },
  });
  const { setFieldsValue, resetFields } = form;
  useEffect(() => {
    if (data) {
      setFieldsValue(data);
    } else {
      resetFields();
    }
  }, [data, setFieldsValue, resetFields]);

  return (
    <Modal
      open={isModalOpen}
      title={title}
      className="w-screen-md"
      trigger={trigger}
      okLoading={addTask.isPending}
      onOk={form.submit}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      onOpenChange={setIsModalOpen}
    >
      {!isModalOpen ? null : id && isLoading ? (
        <>
          <Spin />
        </>
      ) : (
        <AutoForm
          form={form}
          fields={[
            {
              type: "text",
              name: "name",
              label: "Name",
              placeholder: "Enter the project name",
            },
            {
              type: "date-range",
              name: "estimatedDuration",
              label: "Due Date",
            },
            {
              type: "editor",
              name: "content",
              label: "Content",
              apiUpload: async (input) => {
                const res = await upload({
                  file: input.file,
                  fileName: input.fileName,
                });
                return {
                  fileName: res.pathname,
                  url: res.url,
                };
              },
            },
          ]}
        />
      )}
    </Modal>
  );
};
