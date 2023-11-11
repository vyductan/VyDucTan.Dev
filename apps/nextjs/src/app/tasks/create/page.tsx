"use client";

import {
  Button,
  Excalidraw,
  Form,
  Input,
  Tabs,
} from "@vyductan/react/components";

import { TodoModel } from "~/_zod";
import { todoService } from "../actions";

// import { TabExcalidraw } from './components/TabExcalidraw'

export default function TodoCreatePage() {
  return (
    <Form
      // schema={TodoModel}
      serverAction={todoService.create}
    >
      <div className="rounded-default border">
        <Form.Item name="name">
          <Input
            placeholder="Task Name"
            className="font-bold placeholder:font-bold"
            bordered={false}
          />
        </Form.Item>
        <Form.Item name="description">
          <Input
            placeholder="Description"
            bordered={false}
          />
        </Form.Item>
      </div>

      <Button
        htmlType="submit"
        type="primary"
      >
        Save
      </Button>
      {/* <Tabs */}
      {/*   items={[ */}
      {/*     { */}
      {/*       key: 'excalidraw', */}
      {/*       label: 'Exaliraw', */}
      {/*       children: <TabExcalidraw />, */}
      {/*     }, */}
      {/*     { */}
      {/*       key: '1', */}
      {/*       label: 'Excalidraw', */}
      {/*       children: ( */}
      {/*         <Form.Item> */}
      {/*           <Excalidraw className='h-[calc(100vh-80px-38px-24px-48px)]' /> */}
      {/*         </Form.Item> */}
      {/*       ), */}
      {/*     }, */}
      {/*   ]} */}
      {/* /> */}
    </Form>
  );
}
