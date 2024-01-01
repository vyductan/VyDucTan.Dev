import { Resizable } from "@vyductan/ui";

// https://metawork.so/team/detail/gantt?tid=ae1a5b698a0a43b386deafb3075e53d8
export const TasksGantt = () => {
  return (
    <div>
      <Resizable
        direction="horizontal"
        items={[
          {
            defaultSize: 25,
            children: <div>Task 1</div>,
          },
          {
            defaultSize: 75,
            children: <div>Task 2</div>,
          },
        ]}
      />
    </div>
  );
};
