import { CodeBlock } from "@acme/ui/code-block";

export default function Page() {
  return (
    <div>
      <div>
        <div>Export</div>
        <CodeBlock>
          {`
      const table = document.querySelector("#invoice-items-table");
        const workbook = XLSX.utils.table_to_book(table, {
          sheet: "Sheet 1",
        });
        const worksheet = workbook.Sheets["Sheet 1"]!;

        const csv = XLSX.utils.sheet_to_csv(worksheet);
      `}
        </CodeBlock>
      </div>

      <div>
        <div>Download</div>
        <CodeBlock>
          {`
const blob = new Blob([csv], { type: "text/csv" });
const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        link.click();
        URL.revokeObjectURL(url);
      `}
        </CodeBlock>
      </div>
    </div>
  );
}
