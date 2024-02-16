"use client";

import { Form, Input, ModalForm } from "@vyductan/react";
import { Button } from "@vyductan/react/antd";

import { addProjectAction } from "./action";
import { AddProjectSchema } from "./schema";

export const AddProjectModal = () => {
  return (
    <div>
      <ModalForm
        layout="vertical"
        schema={AddProjectSchema}
        serverAction={addProjectAction}
        trigger={<Button>Add</Button>}
      >
        <Form.Item
          label="Title"
          name="title"
        >
          <Input placeholder="Enter Title" />
        </Form.Item>
      </ModalForm>
    </div>
  );
};
