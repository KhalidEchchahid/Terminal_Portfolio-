import { notFound } from "next/navigation"
import { getBlogPosts, getPostBySlug } from "@/lib/mdx"
import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
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
      title: "Post Not Found | Khalid Echchahid",
    }
  }

  // Format the date for SEO
  const formattedDate = new Date(post.date).toISOString()

  // Get the full URL for canonical and OG
  const url = `https://khalidechchahid.me/blog/${params.slug}`

  return {
    title: `${post.title} | Khalid Echchahid`,
    description: post.description,
    authors: [{ name: "Khalid Echchahid", url: "https://github.com/khalidechchahid" }],
    publisher: "Khalid Echchahid",
    keywords: ["Khalid Echchahid", "Khalid", "Morocco", ...(post.tags || []), "blog", "terminal", "web development"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Khalid Echchahid`,
      description: post.description,
      type: "article",
      publishedTime: formattedDate,
      modifiedTime: formattedDate,
      authors: ["Khalid Echchahid"],
      url,
      images: post.image
        ? [
            {
              url: `https://khalidechchahid.me${
                post.image.startsWith("/public/") ? post.image.replace("/public", "") : post.image
              }`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "https://khalidechchahid.me/khalid-echchahid-blog.jpg",
              width: 1200,
              height: 630,
              alt: "Khalid Echchahid",
            },
          ],
      siteName: "Khalid Echchahid - Software Engineer",
      locale: "en_US",
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Khalid Echchahid`,
      description: post.description,
      creator: "@khalidechchahid",
      images: post.image
        ? [
            `https://khalidechchahid.me${
              post.image.startsWith("/public/") ? post.image.replace("/public", "") : post.image
            }`,
          ]
        : ["https://khalidechchahid.me/khalid-echchahid-blog.jpg"],
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

  // Format dates for schema
  const datePublished = new Date(post.date).toISOString()
  const dateModified = datePublished // Use published date as modified date if not available

  // Prepare JSON-LD schema data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image
      ? `https://khalidechchahid.me${
          post.image.startsWith("/public/") ? post.image.replace("/public", "") : post.image
        }`
      : "https://khalidechchahid.me/khalid-echchahid-blog.jpg",
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: "Khalid Echchahid",
      url: "https://khalidechchahid.me",
      image: "https://khalidechchahid.me/khalid-echchahid-profile.jpg",
      nationality: "Moroccan",
      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: "Morocco",
        },
      },
    },
    publisher: {
      "@type": "Person",
      name: "Khalid Echchahid",
      logo: {
        "@type": "ImageObject",
        url: "https://khalidechchahid.me/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://khalidechchahid.me/blog/${params.slug}`,
    },
    keywords: ["Khalid Echchahid", "Morocco", ...(post.tags || [])].join(", "),
    wordCount: post.content.split(/\s+/).length,
    articleBody: post.content,
    inLanguage: "en",
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPostClient post={post} prevPost={prevPost} nextPost={nextPost} relatedPosts={relatedPosts} />
    </>
  )
}

