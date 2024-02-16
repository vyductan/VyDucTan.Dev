import {
  cloneElement,
  HTMLAttributes,
  ReactElement,
  useRef,
  useState,
} from "react";
import { FieldValues } from "react-hook-form";

import Form, { FormProps } from "../form";
import Modal from "./Modal";

type ModalFormProps<TValues extends FieldValues, TResponse> = FormProps<
  TValues,
  TResponse
> & {
  trigger: ReactElement<HTMLAttributes<HTMLElement>>;
  onFinish?: (values: TValues) => Promise<void>;
};
const ModalForm = <TValues extends FieldValues, TResponse>({
  trigger,
  children,
  onSucces,
  ...rest
}: ModalFormProps<TValues, TResponse>) => {
  // const form = Form.useForm()
  const submitRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // ref.current?.submit()
    submitRef.current?.click();
    // setIsModalOpen(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const triggerElement = cloneElement<HTMLAttributes<HTMLElement>>(trigger, {
    onClick: (ev) => {
      showModal();
      trigger.props.onClick?.(ev);
    },
  });
  return (
    <div>
      {triggerElement}

      <Modal
        title="Add new Project"
        open={isModalOpen}
        destroyOnClose
        // confirmLoading={form.submitting}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form<TValues, TResponse>
          // form={form}
          onSucces={(response) => {
            onSucces?.(response);
            setIsModalOpen(false);
          }}
          {...rest}
        >
          {children}
          <button
            ref={submitRef}
            type="submit"
            hidden
          ></button>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalForm;
