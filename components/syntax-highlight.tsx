import type { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  language: string;
  children: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  language,
  children,
  showLineNumbers = true,
}: CodeBlockProps) {
  return (
    <div className="my-4 rounded overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          background: "#1e1e2e",
          borderRadius: "0.25rem",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

interface InlineCodeProps {
  children: ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="px-1 py-0.5 rounded bg-terminal-code text-terminal-text font-mono text-sm">
      {children}
    </code>
  );
}
