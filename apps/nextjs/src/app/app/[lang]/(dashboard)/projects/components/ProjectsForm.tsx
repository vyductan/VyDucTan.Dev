import { useEffect } from "react";

import type { CreateProjectParams } from "@vyductan/api/types";
import { insertProjectSchema } from "@vyductan/api/types";
import { AutoForm, useForm } from "@vyductan/ui/form";
import { Modal } from "@vyductan/ui/modal";
import { Spin } from "@vyductan/ui/spin";
import { message } from "@vyductan/ui/toast";

import { api } from "~/trpc/react";

type Props = {
  id: string | undefined;
  isOpen: boolean;
  onCancel: () => void;
  onOpenChange: (open: boolean) => void;
};
const ProjectModalForm = ({ id, isOpen, onCancel, onOpenChange }: Props) => {
  const utils = api.useUtils();
  const { data, isPending } = api.english.byId.useQuery(
    {
      id: id!,
    },
    {
      enabled: !!id,
    },
  );
  const createProject = api.projects.create.useMutation({
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
  const updateProject = api.projects.update.useMutation({
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

  const form = useForm<CreateProjectParams>({
    schema: insertProjectSchema,
    defaultValues: {},
    onSubmit: async (values) => {
      !id
        ? createProject.mutate(values)
        : updateProject.mutate({
            ...values,
            id,
          });
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
      open={isOpen}
      title={`${!id ? "Add" : "Edit"} Project`}
      className="w-screen-md"
      trigger={<button>XXX</button>}
      onOk={form?.submit}
      onCancel={onCancel}
      onOpenChange={onOpenChange}
    >
      {!isOpen ? null : id && isPending ? (
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
          ]}
        />
      )}
    </Modal>
  );
};

export default ProjectModalForm;
