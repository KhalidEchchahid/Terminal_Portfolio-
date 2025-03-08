"use client"

import { useState } from "react"
import { Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { BlogPost } from "@/lib/mdx"

export default function ClientSearch({ posts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort()

  // Filter posts based on search query and selected tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = !selectedTag || post.tags?.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  return (
    <>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search posts..."
          className="w-full bg-terminal-header border-terminal-border focus:border-terminal-green"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedTag === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTag(null)}
          className={selectedTag === null ? "bg-terminal-green text-black" : ""}
        >
          All
        </Button>

        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={selectedTag === tag ? "bg-terminal-green text-black" : ""}
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </Button>
        ))}
      </div>
    </>
  )
}

