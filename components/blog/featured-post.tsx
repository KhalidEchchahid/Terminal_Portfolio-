import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/mdx"

interface FeaturedPostProps {
  post: BlogPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="relative group overflow-hidden rounded-lg border border-terminal-border bg-gradient-to-br from-terminal-header to-terminal-header-dark hover:border-terminal-green transition-all duration-300">
      <div className="flex flex-col h-full p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-terminal-header-dark/50 text-terminal-text-dim border-terminal-border"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-3 text-terminal-yellow group-hover:text-terminal-green transition-colors duration-300">
          {post.title}
        </h2>

        <p className="text-terminal-text-dim mb-4 flex-grow">{post.description}</p>

        <div className="flex items-center justify-between text-sm text-terminal-text-dim mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>

          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`} className="mt-auto">
          <Button className="w-full bg-terminal-green text-black hover:bg-terminal-green/90">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Background image with overlay */}
      {post.image && (
        <div className="absolute inset-0 -z-10 opacity-10">
           {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image.startsWith("/public/") ? post.image.replace("/public", "") : post.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-terminal-header-dark via-transparent to-transparent" />
        </div>
      )}
    </article>
  )
}

