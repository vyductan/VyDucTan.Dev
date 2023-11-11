import type { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { CodeBlock, MemoizedReactMarkdown } from "@vyductan/components";
import { clsm } from "@vyductan/utils";

type ChatMessageProps = {
  message: Message;
};
export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <MemoizedReactMarkdown
      className={clsm(
        "prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words",
        "flex w-fit max-w-[calc(100%*2/3)] justify-end rounded-md p-2",
        message.role === "user" && "ml-auto bg-primary text-white",
        message.role === "assistant" && "mr-auto bg-gray-100 text-black",
        message.role === "system" && "hidden",
      )}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        code: ({ className, children, ...rest }) => {
          let childrenToRender = children as string;

          if (childrenToRender.length) {
            if (children == "▍") {
              return (
                <span className="mt-1 animate-pulse cursor-default">▍</span>
              );
            }

            childrenToRender =
              childrenToRender[0]?.replace("`▍`", "▍") +
              childrenToRender.slice(1);
          }

          const match = /language-(\w+)/.exec(className ?? "");

          if (match) {
            return (
              <code className={className} {...rest}>
                {childrenToRender}
              </code>
            );
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) ?? undefined}
              {...rest}
            >
              {String(childrenToRender).replace(/\n$/, "")}
            </CodeBlock>
          );
        },
      }}
    >
      {message.content}
    </MemoizedReactMarkdown>
  );
};
