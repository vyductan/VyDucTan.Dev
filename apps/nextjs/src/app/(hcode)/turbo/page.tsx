import { CodeBlock } from "@acme/ui/code-block";

export default function Page() {
  return (
    <div>
      <div>
        <div>
          × failed to connect to daemon ╰─▶ server is unavailable: channel
          closed
        </div>
        <CodeBlock>
          {`
turbo daemon clean
};
      `}
        </CodeBlock>
      </div>
    </div>
  );
}
