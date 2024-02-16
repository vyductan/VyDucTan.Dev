"use client";

import { useState, type PropsWithChildren } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

import { THEME_TOKENS } from "~/config/theme";

export const AntdProvider = ({ children }: PropsWithChildren) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  return (
    <ConfigProvider
      theme={{
        token: THEME_TOKENS,
      }}
    >
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  );
};
