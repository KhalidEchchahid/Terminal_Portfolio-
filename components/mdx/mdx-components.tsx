"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

const mdxComponents = {
  // Custom heading components with anchor links
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("mt-10 mb-6 text-3xl font-bold text-terminal-green scroll-m-20", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    // Get ID for linking
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, "-")
    return (
      <h2
        id={id}
        className={cn(
          "mt-10 mb-4 text-2xl font-semibold text-terminal-green scroll-m-20 border-b border-terminal-border pb-2",
          className,
        )}
        {...props}
      />
    )
  },
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, "-")
    return (
      <h3
        id={id}
        className={cn("mt-8 mb-3 text-xl font-semibold text-terminal-green scroll-m-20", className)}
        {...props}
      />
    )
  },
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn("mt-6 mb-2 text-lg font-semibold text-terminal-green scroll-m-20", className)} {...props} />
  ),
  // Custom paragraph
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 mb-4 text-terminal-text", className)} {...props} />
  ),
  // Link with proper styling
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http") || false

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "font-medium text-terminal-blue underline underline-offset-4 hover:text-terminal-blue/80",
            className,
          )}
          {...props}
        />
      )
    }

    return (
      <Link
        href={href || "#"}
        className={cn(
          "font-medium text-terminal-blue underline underline-offset-4 hover:text-terminal-blue/80",
          className,
        )}
        {...props}
      />
    )
  },
  // Custom image component
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border border-terminal-border", className)} alt={alt || ""} {...props} />
  ),
  // Lists
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-4 ml-6 list-disc marker:text-terminal-green space-y-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-4 ml-6 list-decimal marker:text-terminal-green space-y-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("text-terminal-text", className)} {...props} />
  ),
  // Blockquote
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn("mt-6 mb-6 border-l-4 border-terminal-green pl-4 italic text-terminal-text-dim", className)}
      {...props}
    />
  ),
  // Horizontal rule
  hr: ({ ...props }) => <hr className="my-8 border-terminal-border" {...props} />,
  // Enhanced code blocks with syntax highlighting and copy button
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const preRef = React.useRef<HTMLPreElement>(null)

    const language = className?.includes("language-") ? className.split("language-")[1] : "text"

    return (
      <div className="relative my-6 group">
        <div className="absolute top-0 right-0 p-2">
          <CopyButton text={preRef.current?.textContent || ""} />
        </div>
        <div className="absolute top-0 left-0 px-3 py-1 text-xs bg-terminal-header-dark text-terminal-text-dim rounded-br border-r border-b border-terminal-border">
          {language}
        </div>
        <pre
          ref={preRef}
          className={cn(
            "pt-7 px-4 py-3 rounded-lg bg-terminal-header-dark border border-terminal-border overflow-x-auto text-terminal-text",
            className,
          )}
          {...props}
        />
      </div>
    )
  },
  // Inline code
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-terminal-header-dark px-[0.3rem] py-[0.2rem] font-mono text-sm text-terminal-yellow",
        className,
      )}
      {...props}
    />
  ),
  // Table
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("border-b border-terminal-border m-0 p-0 even:bg-terminal-header-dark", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn("border border-terminal-border px-4 py-2 text-left font-bold text-terminal-green", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn("border border-terminal-border px-4 py-2 text-left", className)} {...props} />
  ),
}

export default mdxComponents

