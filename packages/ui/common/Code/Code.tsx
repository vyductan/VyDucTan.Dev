// import {
//   Prism as SyntaxHighlighter,
//   type SyntaxHighlighterProps,
// } from 'react-syntax-highlighter'
//
// export type CodeProps = SyntaxHighlighterProps
// export const Code = ({ ...restProps }: CodeProps) => {
//   return <SyntaxHighlighter {...restProps} />
// }

import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { clsm } from "@vyductan/react";
import {
  Prism as SyntaxHighlighter,
  type SyntaxHighlighterProps,
} from "react-syntax-highlighter";

export type CodeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;
const CodeInternal = ({ className, ...restProps }: CodeProps) => {
  return (
    <code
      className={clsm("text-red-500", className)}
      {...restProps}
    />
  );
};

export const Code = Object.assign(CodeInternal, {
  Block: SyntaxHighlighter,
});

// type CodeBlockProps = SyntaxHighlighterProps
// export const CodeBlock = ({ children, ...restProps }: CodeBlockProps) => {
//   return <SyntaxHighlighter {...restProps}>{children}</SyntaxHighlighter>
// }

export type CodeBlockProps = SyntaxHighlighterProps;
export const CodeBlock = ({ ...restProps }: CodeBlockProps) => {
  return <SyntaxHighlighter {...restProps} />;
};
