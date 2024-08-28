"use client";

import { useEffect, useState } from "react";
import { generate } from "@ant-design/colors";

import { CodeBlock } from "@acme/ui/code-block";
import { Input } from "@acme/ui/input";
import { ExternalLink } from "@acme/ui/link";
import { hexToHsl } from "@acme/utils/color";

export default function ThemePage() {
  const [input, setInput] = useState<{
    name: string;
    slug: string;
    color: string;
    backgroundColor: string;
  }>({
    name: "Flush Orange",
    slug: "primary",
    color: "#ff8200",
    backgroundColor: "#000000",
  });

  const [palette, setPalette] = useState<string[]>([]);
  const [darkPalete, setDarkPalette] = useState<string[]>([]);

  useEffect(() => {
    setPalette(generate(input.color));
    const d = generate(input.color, {
      theme: "dark",
      backgroundColor: input.backgroundColor,
    });
    const x = [...d.slice(1), ...d.slice(0, 1)].reverse();
    setDarkPalette(x);
  }, [input]);

  return (
    <div>
      <ExternalLink href="https://uicolors.app/create">
        Tailwind CSS Color Generator
      </ExternalLink>
      <Input
        value={input.name}
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />
      <Input
        value={input.slug}
        onChange={(e) => setInput({ ...input, slug: e.target.value })}
      />
      <Input
        value={input.color}
        onChange={(e) => setInput({ ...input, color: e.target.value })}
      />
      <Input
        value={input.backgroundColor}
        onChange={(e) =>
          setInput({ ...input, backgroundColor: e.target.value })
        }
      />
      <CodeBlock language="css">
        {palette
          .map((c, index) => {
            const hsl = hexToHsl(c);
            return `--${input.slug}-${
              index === palette.length - 1 ? 950 : (index + 1) * 100
            }: ${hsl.h} ${hsl.s}% ${hsl.l}%;`;
          })
          .join("\n")}
      </CodeBlock>
      {palette.map((c, index) => (
        <div key={index} style={{ color: c }}>
          {c}
        </div>
      ))}
      <CodeBlock language="css">
        {darkPalete
          .map((c, index) => {
            const hsl = hexToHsl(c);
            return `--${input.slug}-${
              index === palette.length - 1 ? 950 : (index + 1) * 100
            }: ${hsl.h} ${hsl.s}% ${hsl.l}%;`;
          })
          .join("\n")}
      </CodeBlock>
      {darkPalete.map((c, index) => (
        <div key={index} style={{ color: c }}>
          {c}
        </div>
      ))}
    </div>
  );
}
