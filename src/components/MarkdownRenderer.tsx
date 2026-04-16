"use client";

import { useMemo, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { Components } from "react-markdown";
import CodeBlock from "./CodeBlock";

export default function MarkdownRenderer({ content }: { content: string }) {
  const blockCounterRef = useRef(0);
  // Reset the counter on every render so block IDs stay stable across re-renders
  // for the same content.
  blockCounterRef.current = 0;

  const components = useMemo<Components>(
    () => ({
      h2: ({ children, ...props }) => (
        <h2
          className="text-text-title text-[18px] font-semibold mt-8 mb-3 pb-1 border-b border-border"
          {...props}
        >
          {children}
        </h2>
      ),
      h3: ({ children, ...props }) => (
        <h3 className="text-text-title text-[16px] font-semibold mt-6 mb-2" {...props}>
          {children}
        </h3>
      ),
      p: ({ children, ...props }) => (
        <p className="text-text-body text-[15px] leading-[1.8] mb-4" {...props}>
          {children}
        </p>
      ),
      code: ({ className, children, ...props }) => {
        const isBlock = Boolean(className?.startsWith("language-"));
        if (isBlock) {
          const lang = className?.replace("language-", "") || "text";
          const blockId = `block-${blockCounterRef.current++}`;
          const codeText = String(children).replace(/\n$/, "");
          return <CodeBlock blockId={blockId} code={codeText} language={lang} />;
        }
        return (
          <code
            className="bg-[#151520] text-accent text-[13px] px-1.5 py-0.5 rounded border border-border font-mono"
            {...props}
          >
            {children}
          </code>
        );
      },
      pre: ({ children }) => <>{children}</>,
      blockquote: ({ children, ...props }) => (
        <blockquote
          className="border-l-[3px] border-accent bg-[#0d1a20] pl-4 py-2 my-4 rounded-r"
          {...props}
        >
          {children}
        </blockquote>
      ),
      a: ({ href, children, ...props }) => {
        if (href?.startsWith("/")) {
          return (
            <Link href={href} className="text-tag hover:text-accent transition-colors" {...props}>
              {children}
            </Link>
          );
        }
        return (
          <a
            href={href}
            className="text-tag hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        );
      },
      ul: ({ children, ...props }) => (
        <ul className="list-disc list-inside text-text-body text-[15px] mb-4 space-y-1" {...props}>
          {children}
        </ul>
      ),
      ol: ({ children, ...props }) => (
        <ol className="list-decimal list-inside text-text-body text-[15px] mb-4 space-y-1" {...props}>
          {children}
        </ol>
      ),
    }),
    []
  );

  return (
    <div className="prose-custom">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
}
