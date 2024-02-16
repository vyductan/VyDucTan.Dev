import ReactMarkdown from "react-markdown";
import { type ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import {
  Prism as SyntaxHighlighter,
  type SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Code, CodeBlock } from "../Code";

export type MarkdownProps = ReactMarkdownOptions;
export const Markdown = ({ ...restProps }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        code: ({
          node: _node,
          inline,
          className,
          children,
          style,
          ...restCodeProps
        }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <CodeBlock
              {...restCodeProps}
              language={match[1]}
              style={vscDarkPlus}
              PreTag={({ children }) => <>{children}</>}
            >
              {String(children).replace(/\n$/, "")}
            </CodeBlock>
          ) : (
            <Code
              className={className}
              style={style}
              {...restCodeProps}
            >
              {children}
            </Code>
          );
        },
      }}
      {...restProps}
    />
  );
};
