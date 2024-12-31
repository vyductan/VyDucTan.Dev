import { CodeBlock } from "@acme/ui/code-block";

export default function Page() {
  return (
    <div>
      <div>
        <div>by Text</div>
        <CodeBlock>
          {`
timeline_button_elm = findElement(
                    driver,
                    By.XPATH,
                    '//a[text()="Timeline"]',
                )
      `}
        </CodeBlock>
      </div>
    </div>
  );
}
