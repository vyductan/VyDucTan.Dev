"use client"

import { Form, Input, Modal } from "@vyductan/ui"

export const AddVocabularyModal = () => {
  return (
    <div>
      <Modal
      // layout="vertical"
      // schema={AddProjectSchema}
      // serverAction={addProjectAction}
      // trigger={<Button>Add</Button>}
      >
        <Form>
          <Form.Item
            label="Title"
            name="title"
          >
            <Input placeholder="Enter Title" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
