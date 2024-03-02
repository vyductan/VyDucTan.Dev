"use client";

import dynamic from "next/dynamic";

import { upload } from "~/lib/upload";

const Editor = dynamic(() => import("@vyductan/ui/editor"), { ssr: false });

export default function ProjectDetailPage() {
  return (
    <Editor
      // value={{
      //   root: {
      //     children: [
      //       {
      //         children: [
      //           {
      //             detail: 0,
      //             format: 0,
      //             mode: "normal",
      //             style: "",
      //             text: "113",
      //             type: "text",
      //             version: 1,
      //           },
      //         ],
      //         direction: null,
      //         format: "",
      //         indent: 0,
      //         type: "paragraph",
      //         version: 1,
      //       },
      //       {
      //         children: [
      //           {
      //             altText: "carbon.png",
      //             caption: {
      //               editorState: {
      //                 root: {
      //                   children: [],
      //                   direction: null,
      //                   format: "",
      //                   indent: 0,
      //                   type: "root",
      //                   version: 1,
      //                 },
      //               },
      //             },
      //             height: 284.169375,
      //             maxWidth: 500,
      //             showCaption: false,
      //             src: "https://fsiigeunka7hxdh7.public.blob.vercel-storage.com/carbon-wVWb492dlY6K85VhBwJW7zegBFqRaT.png",
      //             type: "image",
      //             version: 1,
      //             width: 294,
      //           },
      //         ],
      //         direction: null,
      //         format: "",
      //         indent: 0,
      //         type: "paragraph",
      //         version: 1,
      //       },
      //     ],
      //     direction: null,
      //     format: "",
      //     indent: 0,
      //     type: "root",
      //     version: 1,
      //   },
      // }}
      apiUpload={async (input) => {
        const res = await upload({
          file: input.file,
          fileName: input.fileName,
        });
        return {
          fileName: res.pathname,
          url: res.url,
        };
      }}
    />
  );
}
