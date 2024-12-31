import { CodeBlock } from "@acme/ui/code-block";

const temporaryData = [
  {
    id: "1",
  },
];
export default function Page() {
  return (
    <div>
      <div>
        <div>Toolbar</div>
        <CodeBlock>
          {`
          const isFiltered = table.getState().columnFilters.length > 0;
      `}
        </CodeBlock>
      </div>
    </div>
  );
}
