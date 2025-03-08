import type React from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import mdxComponents from "@/components/mdx/mdx-components"

interface MDXContentProps {
  content: string
}

export default function MDXContent({ content }: MDXContentProps) {
  // Enhanced components that ensure headings have IDs
  const enhancedComponents = {
    ...mdxComponents,
    h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || ""
      return (
        <mdxComponents.h1 id={id} {...props}>
          {children}
        </mdxComponents.h1>
      )
    },
    h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || ""
      return (
        <mdxComponents.h2 id={id} {...props}>
          {children}
        </mdxComponents.h2>
      )
    },
    h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || ""
      return (
        <mdxComponents.h3 id={id} {...props}>
          {children}
        </mdxComponents.h3>
      )
    },
  }

  return <MDXRemote source={content} components={enhancedComponents} />
}

