import type {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const TodoTable = ({
  data: __,
  properties: _,
}: {
  data: PageObjectResponse[];
  properties: DatabaseObjectResponse["properties"];
}) => {
  // const columns: TableProps<PageObjectResponse>["columns"] =
  //   Object.entries(properties).map(([key, value]) => {
  //     const column: TableProps<PageObjectResponse>["columns"][number] =
  //       {
  //         id: key,
  //         header: key,
  //       };
  //     // const record = props.row.original;
  //     if (value.type === "title") {
  //       column.cell = (props) => {
  //         const prop = props.row.original.properties[key];
  //         if (prop?.type === "title") {
  //           return prop.title[0]?.plain_text;
  //         }
  //       };
  //     }
  //     return column;
  //   });
  //   [
  //   {
  //     // title: "Task name",
  //     id: "task-name",
  //     header:(props) =>{
  //         props.header.
  //     },
  //     accessorFn: (original) => original,
  //     cell: (props) => {
  //       const record = props.row.original;
  //
  //       if (record.properties["Task name"]?.type === "title") {
  //         return (
  //           <div>{record.properties["Task name"].title[0]?.plain_text}</div>
  //         );
  //       }
  //     },
  //   },
  //   {
  //     // title: "Task name",
  //     id: "task-name",
  //     accessorFn: (original) => original,
  //     cell: (props) => {
  //       const record = props.row.original;
  //
  //       if (record.properties["Task name"]?.type === "title") {
  //         return (
  //           <div>{record.properties["Task name"].title[0]?.plain_text}</div>
  //         );
  //       }
  //     },
  //   },
  // ];
  return (
    <>
      {/* <Table */}
      {/*   // rowKey="id" */}
      {/*   columns={columns} */}
      {/*   data={data} */}
      {/*   // pagination={false} */}
      {/* /> */}
    </>
  );
};
