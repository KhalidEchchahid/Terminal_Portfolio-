// This file contains server-only code
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

// Define the directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), "content", "blog")

// Define the BlogPost type
export type BlogPost = {
  slug: string
  title: string
  date: string
  content: string
  description: string
  image?: string
  tags?: string[]
  readingTime: number
  featured?: boolean
}

// Get all blog posts, sorted by date
export function getBlogPosts(): BlogPost[] {
  // Check if the directory exists first
  if (!fs.existsSync(postsDirectory)) {
    return [] // Return empty array if directory doesn't exist yet
  }

  // Get all files from the posts directory
  const filenames = fs.readdirSync(postsDirectory)

  // Filter and parse MDX files
  const posts = filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      // Get the file path
      const filePath = path.join(postsDirectory, filename)

      // Get the file content
      const fileContents = fs.readFileSync(filePath, "utf8")

      // Parse the frontmatter and content
      const { data, content } = matter(fileContents)

      // Calculate reading time
      const readingTimeResult = readingTime(content)

      // Get the slug from the filename (without .mdx extension)
      const slug = filename.replace(/\.mdx$/, "")

      // Return the post data
      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        content,
        description: data.description || "",
        image: data.image || null,
        tags: data.tags || [],
        readingTime: Math.ceil(readingTimeResult.minutes),
        featured: data.featured || false,
      }
    })
    // Sort posts by date (newest first)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

// Get a specific blog post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  // Check if the directory exists first
  if (!fs.existsSync(postsDirectory)) {
    return null // Return null if directory doesn't exist yet
  }

  // Check if the file exists
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return null
  }

  // Get the file content
  const fileContents = fs.readFileSync(filePath, "utf8")

  // Parse the frontmatter and content
  const { data, content } = matter(fileContents)

  // Calculate reading time
  const readingTimeResult = readingTime(content)

  // Return the post data
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    content,
    description: data.description || "",
    // Fix image path if it starts with /public/
    image: data.image ? (data.image.startsWith("/public/") ? data.image.replace("/public", "") : data.image) : null,
    tags: data.tags || [],
    readingTime: Math.ceil(readingTimeResult.minutes),
    featured: data.featured || false,
  }
}

