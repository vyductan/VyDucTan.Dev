import type { z } from "zod";
import { useEffect } from "react";

import type { SubmitHandler } from "@acme/ui/form";
import type { ModalProps } from "@acme/ui/modal";
import { insertTaskSchema } from "@acme/api/types";
import { AutoForm, useForm } from "@acme/ui/form";
import { Modal } from "@acme/ui/modal";
import { Spin } from "@acme/ui/spin";

import { upload } from "~/lib/upload";
import { api } from "~/trpc/react";

type TasksModalFormProps = ModalProps & {
  id?: string;
  projectId: string;
  title: string;
  searchingTasks: [];
  onSubmit: SubmitHandler<z.infer<typeof insertTaskSchema>>;
};
export const TasksModalForm = ({
  id,
  projectId,
  title,
  searchingTasks,
  onSubmit,

  ...modalProps
}: TasksModalFormProps) => {
  const { data, isLoading } = api.tasks.byId.useQuery(
    {
      id: id!,
    },
    {
      enabled: !!id,
    },
  );

  const form = useForm({
    schema: insertTaskSchema,
    defaultValues: {
      projectId,
    },
    onSubmit,
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
      title={title}
      className="w-screen-md"
      onOk={form.submit}
      {...modalProps}
    >
      {!modalProps.open ? null : id && isLoading ? (
        <>
          <Spin />
        </>
      ) : (
        <AutoForm
          form={form}
          fields={[
            {
              type: "autocomplete",
              name: "parentId",
              label: "Parrent",
              placeholder: "Enter the project name",
              options: searchingTasks,
            },
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
