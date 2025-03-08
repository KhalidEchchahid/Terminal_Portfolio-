"use client"

import { useState, useEffect } from "react"
import { Tag, Search, Calendar, Grid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BlogPost } from "@/lib/mdx"

interface BlogFiltersProps {
  posts: BlogPost[]
}

export default function BlogFilters({ posts }: BlogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "alphabetical">("newest")
  const [dateRange, setDateRange] = useState<"all" | "week" | "month" | "year">("all")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts)

  // Get unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort()

  // Filter posts based on all criteria
  useEffect(() => {
    let result = [...posts]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      result = result.filter((post) => selectedTags.every((tag) => post.tags?.includes(tag)))
    }

    // Apply date filter
    if (dateRange !== "all") {
      const now = new Date()
      const cutoffDate = new Date()

      switch (dateRange) {
        case "week":
          cutoffDate.setDate(now.getDate() - 7)
          break
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1)
          break
        case "year":
          cutoffDate.setFullYear(now.getFullYear() - 1)
          break
      }

      result = result.filter((post) => new Date(post.date) >= cutoffDate)
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "alphabetical":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredPosts(result)

    // Emit the filtered posts to parent component
    // This would require a callback prop if we want to pass the data up
  }, [searchQuery, selectedTags, dateRange, sortOrder, posts])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setDateRange("all")
    setSortOrder("newest")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-text-dim" />
          <Input
            type="text"
            placeholder="Search posts..."
            className="w-full bg-terminal-header border-terminal-border focus:border-terminal-green pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Order */}
        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
          <SelectTrigger className="w-[180px] bg-terminal-header border-terminal-border">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-terminal-header-dark border-terminal-border">
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range */}
        <Select value={dateRange} onValueChange={(value) => setDateRange(value as any)}>
          <SelectTrigger className="w-[180px] bg-terminal-header border-terminal-border">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent className="bg-terminal-header-dark border-terminal-border">
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode Toggle */}
        <div className="flex border border-terminal-border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-none ${viewMode === "grid" ? "bg-terminal-header-light" : "bg-terminal-header"}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid View</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-none ${viewMode === "list" ? "bg-terminal-header-light" : "bg-terminal-header"}`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List View</span>
          </Button>
        </div>

        {/* Advanced Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-terminal-header border-terminal-border">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(selectedTags.length > 0 || dateRange !== "all") && (
                <Badge className="ml-2 bg-terminal-green text-black" variant="secondary">
                  {selectedTags.length + (dateRange !== "all" ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-terminal-header-dark border-terminal-border">
            <div className="space-y-4">
              <h4 className="font-medium text-terminal-green">Filter Posts</h4>

              <Separator className="bg-terminal-border" />

              <div className="space-y-2">
                <h5 className="text-sm font-medium text-terminal-text">Tags</h5>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {allTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                        className="data-[state=checked]:bg-terminal-green data-[state=checked]:border-terminal-green"
                      />
                      <Label htmlFor={`tag-${tag}`} className="text-sm text-terminal-text-dim cursor-pointer">
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-terminal-text-dim hover:text-terminal-text"
                >
                  Reset filters
                </Button>
                <Button size="sm" className="bg-terminal-green text-black hover:bg-terminal-green/90">
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters */}
      {(selectedTags.length > 0 || searchQuery || dateRange !== "all") && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm text-terminal-text-dim">Active filters:</span>

          {searchQuery && (
            <Badge variant="secondary" className="bg-terminal-header flex items-center gap-1">
              <Search className="h-3 w-3" />
              {searchQuery}
              <button className="ml-1 hover:text-terminal-green" onClick={() => setSearchQuery("")}>
                ×
              </button>
            </Badge>
          )}

          {dateRange !== "all" && (
            <Badge variant="secondary" className="bg-terminal-header flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {dateRange === "week" ? "Past week" : dateRange === "month" ? "Past month" : "Past year"}
              <button className="ml-1 hover:text-terminal-green" onClick={() => setDateRange("all")}>
                ×
              </button>
            </Badge>
          )}

          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-terminal-header flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
              <button className="ml-1 hover:text-terminal-green" onClick={() => toggleTag(tag)}>
                ×
              </button>
            </Badge>
          ))}

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-terminal-text-dim hover:text-terminal-green"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-terminal-text-dim">
        Showing {filteredPosts.length} of {posts.length} posts
      </div>
    </div>
  )
}

