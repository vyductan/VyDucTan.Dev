import ReactMarkdown from "react-markdown";

import { clsm, Code, Markdown } from "@vyductan/react";

import { type ChatGPTMessage } from "../types";

// // util helper to convert new lines to <br /> tags
// const convertNewLines = (text: string) => {
//   const result: ReactNode[] = []
//   let idx = 0
//   let isCode = false
//   let codeText = ''
//   let codeLang = ''
//   let isCodeTagBefore = false
//   text.split('\n').forEach((line) => {
//     if (/^```/.test(line) && !isCode) {
//       console.log('line', line)
//       isCode = true
//       const s = line.split('```')
//       if (s.length > 1 && typeof s[1] === 'string') {
//         codeLang = s[1]
//       }
//       // splice to remove </br> before
//       result.splice(
//         result.length - 1,
//         1,
//         <Code
//           key={idx}
//           language={codeLang}
//         >
//           {codeText}
//         </Code>
//       )
//       return
//     }
//     // end code tag
//     if (line === '```' && isCode) {
//       isCode = false
//       isCodeTagBefore = true
//       idx += 1
//       codeText = ''
//       codeLang = ''
//       return
//     }
//     if (isCode && line !== '```') {
//       codeText = codeText + '\n' + line
//       result.splice(
//         result.length - 1,
//         1,
//         <Code
//           key={idx}
//           language={codeLang}
//         >
//           {codeText}
//         </Code>
//       )
//       return
//     }
//
//     let message: Array<string | JSX.Element> = [line]
//     // const matched = line.match(/(.*)(`.*`)(.*)/)
//     const matched = line.match(/(`.*?`)|(\b[\p{L}\p{M}]+\b)/gu)
//     // console.log('mache', matched)
//     const s = line.split(' ')
//     // console.log("s", s)
//     const text: Array<string | JSX.Element> = []
//     let tempStr = ''
//     s.forEach((t, idx) => {
//       if (/`.*`/.test(t)) {
//         text.push(tempStr)
//         tempStr = ''
//         text.push(<code>{t.replace(/(^`)|(`$)/g, '')}</code>)
//       } else {
//         if (idx !== 0) tempStr += ' '
//         tempStr += t
//       }
//       if (idx === s.length - 1) {
//         text.push(tempStr)
//       }
//     })
//     message = s.map((m, idx) => {
//       if (/`.*`/.test(m)) {
//         return <code key={idx}>{m.replace(/(^`)|(`$)/g, '')}</code>
//       } else {
//         return m
//       }
//     })
//     const x = message.join(' ')
//     console.log('x', x)
//     // if (matched && matched.length > 1) {
//     //   message = matched.map((m, idx) => {
//     //     if (/`.*`/.test(m)) {
//     //       return <code key={idx}>{m.replace(/(^`)|(`$)/g, '')}</code>
//     //     } else {
//     //       return m
//     //     }
//     //   })
//     // }
//
//     // if(m?.length>1){
//     //   result.push(m?.slice(1).map(item => ))
//     // }
//     // const s = line.split(/`[\w+]+`/)
//     // s.map()
//
//     result.push(
//       <span key={idx}>
//         {text}
//         <br />
//       </span>
//     )
//     idx += 1
//   })
//   return result
// }
type MessageLineProps = ChatGPTMessage;
export const MessageLine = ({ role, content }: MessageLineProps) => {
  if (!content) {
    return null;
  }

  // const formattedMessage = convertNewLines(content)

  return (
    <div
      className={clsm(
        "rounded-base max-w-2/3 flex flex-col px-4 py-2",
        "prose prose-sm prose-p:my-1 prose-pre:my-1 prose-ul:my-0",
        role === "user" && "ml-auto bg-primary-600 text-white",
        role === "assistant" && "mr-auto bg-gray-100",
      )}
    >
      <Markdown>{content}</Markdown>
    </div>
  );
};

// loading placeholder animation for the chat line
export const LoadingMessageLine = () => (
  <div className="rounded-base max-w-2/3 flex h-md animate-pulse items-center bg-gray-100 px-4 py-2">
    <div className="h-2 w-full rounded bg-zinc-500"></div>
  </div>
);
