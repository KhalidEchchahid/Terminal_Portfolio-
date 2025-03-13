import type { Metadata } from "next"
import { getBlogPosts } from "@/lib/mdx"
import Link from "next/link"
import { Calendar, Clock, Bookmark, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import BlogFilters from "@/components/blog/blog-filters"
import FeaturedPost from "@/components/blog/featured-post"
import NewsletterSignup from "@/components/blog/newsletter-signup"
import { Separator } from "@/components/ui/separator"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Blog | Khalid Echchahid - Moroccan Software Engineer",
  description:
    "Explore Khalid Echchahid's articles about software development.",
  keywords: [
    "Khalid Echchahid",
    "Khalid",
    "Moroccan developer",
    "blog",
    "terminal",
    "web development",
    "coding",
    "programming",
    "tutorials",
  ],
  alternates: {
    canonical: "https://khalidechchahid.me/blog",
  },
  openGraph: {
    title: "Khalid Echchahid's Blog | Insights on Development and Technology",
    description:
      "Explore Khalid Echchahid's articles about software development and web technologies.",
    url: "https://khalidechchahid.me/blog",
    type: "website",
    // images: [
    //   {
    //     url: "https://khalidechchahid.me/khalid-echchahid-blog.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Khalid Echchahid's Blog",
    //   },
    // ],
    siteName: "Khalid Echchahid - Software Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid Echchahid's Blog | Insights on Development and Technology",
    description:
      "Explore Khalid Echchahid's articles about software development and web technologies.",
    images: ["https://khalidechchahid.me/khalid-echchahid-blog.jpg"],
    creator: "@khalidechchahid",
  },
}

export default function BlogPage() {
  // Static fetch of posts happens at build time since this is a server component
  const posts = getBlogPosts()

  // Find featured posts
  const featuredPosts = posts.filter((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  // Prepare JSON-LD schema data for blog listing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Khalid Echchahid's Blog",
    description:
      "Thoughts, tutorials, and insights about software development and web technologies.",
    url: "https://khalidechchahid.me/blog",
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
        url: "https://khalidechchahid.me/khalid.jpg",
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: new Date(post.date).toISOString(),
      url: `https://khalidechchahid.me/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: "Khalid Echchahid",
        nationality: "Moroccan",
      },
      keywords: post.tags?.join(", ") || "",
      image: post.image
        ? `https://khalidechchahid.me${
            post.image.startsWith("/public/") ? post.image.replace("/public", "") : post.image
          }`
        : "https://khalidechchahid.me/khalid-echchahid-blog.jpg",
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen bg-terminal-bg text-terminal-text">
        <div className="container mx-auto px-4 py-16">
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4">Khalid Echchahid&#39;s Blog</h1>
            <p className="text-terminal-text-dim md:text-lg max-w-2xl">
              Thoughts, tutorials, and insights about software development, web technologies, and terminal magic from
              Morocco.
            </p>
          </header>

          {/* Featured Post Section */}
          {featuredPosts.length > 0 && (
            <section className="mb-16" aria-labelledby="featured-posts-heading">
              <div className="flex items-center mb-6">
                <Sparkles className="h-5 w-5 text-terminal-yellow mr-2" aria-hidden="true" />
                <h2 id="featured-posts-heading" className="text-xl font-bold text-terminal-yellow">
                  Featured Posts
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.slice(0, 2).map((post) => (
                  <FeaturedPost key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Newsletter Signup */}
          <section className="mb-16" aria-labelledby="newsletter-heading">
            <NewsletterSignup />
          </section>

          {/* Blog Filters */}
          <section className="mb-8">
            <BlogFilters posts={regularPosts} />
          </section>

          <Separator className="mb-8 bg-terminal-border" />

          {/* Blog Posts Grid */}
          <section aria-labelledby="blog-posts-heading">
            <h2 id="blog-posts-heading" className="sr-only">
              Blog Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                  aria-labelledby={`post-title-${post.slug}`}
                >
                  <article className="h-full border border-terminal-border bg-terminal-header-dark rounded-lg overflow-hidden transition-all duration-300 hover:border-terminal-green hover:shadow-[0_0_10px_rgba(166,227,161,0.3)]">
                    <div className="aspect-video bg-terminal-header relative overflow-hidden">
                      {post.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.image.startsWith("/public/") ? post.image.replace("/public", "") : post.image}
                          alt={`Cover image for ${post.title}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-terminal-header-dark">
                          <span className="text-terminal-green text-5xl font-mono" aria-hidden="true">{`{ }`}</span>
                        </div>
                      )}

                      {post.featured && (
                        <div className="absolute top-0 right-0 bg-terminal-yellow text-black text-xs font-bold px-3 py-1">
                          Featured
                        </div>
                      )}

                      {/* Reading time badge */}
                      <div className="absolute bottom-2 right-2 bg-terminal-header-dark/80 text-terminal-text-dim text-xs px-2 py-1 rounded flex items-center">
                        <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-terminal-header text-terminal-text-dim border-terminal-border"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags && post.tags.length > 3 && (
                          <Badge
                            variant="outline"
                            className="bg-terminal-header text-terminal-text-dim border-terminal-border"
                          >
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <h2
                        id={`post-title-${post.slug}`}
                        className="text-xl font-bold mb-2 text-terminal-green group-hover:text-terminal-yellow transition-colors duration-300"
                      >
                        {post.title}
                      </h2>

                      <p className="text-terminal-text-dim mb-4 line-clamp-2">{post.description}</p>

                      <div className="flex items-center justify-between text-xs text-terminal-text-dim">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
                          <time dateTime={new Date(post.date).toISOString()}>{formatDate(post.date)}</time>
                        </div>

                        <div className="flex items-center">
                          <Bookmark className="h-3 w-3 mr-1" aria-hidden="true" />
                          <span>Save</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

// Helper function to format dates
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

