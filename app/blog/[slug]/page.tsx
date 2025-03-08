import { notFound } from "next/navigation"
import { getBlogPosts, getPostBySlug } from "@/lib/mdx"
import type { Metadata } from "next"
import BlogPostClient from "./blog-port-client"


// Define the params type
interface BlogPostParams {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Terminal Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Your Name"],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  }
}

// Generate static params for all blog posts
export function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Get related posts based on tags
function getRelatedPosts(currentPost: any, allPosts: any[]) {
  if (!currentPost.tags || currentPost.tags.length === 0) return []

  return allPosts
    .filter((post) => {
      if (post.slug === currentPost.slug) return false
      if (!post.tags) return false
      return post.tags.some((tag: string) => currentPost.tags.includes(tag))
    })
    .slice(0, 3)
}

export default function BlogPost({ params }: BlogPostParams) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get all posts for navigation and related posts
  const allPosts = getBlogPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const relatedPosts = getRelatedPosts(post, allPosts)

  return <BlogPostClient post={post} prevPost={prevPost} nextPost={nextPost} relatedPosts={relatedPosts} />
}

