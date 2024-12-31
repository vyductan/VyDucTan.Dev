import { CodeBlock } from "@acme/ui/code-block";

export default function Page() {
  return (
    <div>
      <div>
        <div>Init project</div>
      </div>
      <div>Preview</div>
      <CodeBlock>
        {`
          1. Create new repo
          2. Clone repo
      `}
      </CodeBlock>
    </div>
  );
}
