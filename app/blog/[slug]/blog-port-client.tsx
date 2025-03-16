"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const MDXRemote = dynamic(
  () => import("next-mdx-remote/rsc").then((mod) => mod.MDXRemote),
  {
    ssr: true,
  }
);
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Github,
  Share2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import TableOfContents from "@/components/mdx/table-of-contents";
import mdxComponents from "@/components/mdx/mdx-components";
import ShareButtons from "@/components/blog/share-buttons";
import type { BlogPost } from "@/lib/mdx";
import Comments from "@/components/blog/comments";
import { toast } from "sonner";
import { PortfolioButton } from "@/components/portfolio-button";

interface BlogPostClientProps {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({
  post,
  prevPost,
  nextPost,
  relatedPosts,
}: BlogPostClientProps) {

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === "ArrowLeft" && prevPost) {
          window.location.href = `/blog/${prevPost.slug}`;
        } else if (e.key === "ArrowRight" && nextPost) {
          window.location.href = `/blog/${nextPost.slug}`;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [prevPost, nextPost]);

  // Format date for display
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <div className="container mx-auto px-4 py-16">
      <PortfolioButton position="bottom-right" />
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-terminal-text-dim hover:text-terminal-green transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all posts
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-6">
              {post.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-terminal-header text-terminal-text-dim border-terminal-border"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author and Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/khalid.jpg" alt="Author" />
                  <AvatarFallback>YN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-terminal-text">
                    Khalid Echchahid
                  </div>
                  <div className="text-sm text-terminal-text-dim">
                    @khalidEchchahid
                  </div>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="h-8 bg-terminal-border"
              />

              <div className="flex items-center gap-4 text-terminal-text-dim">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-8 rounded-lg overflow-hidden border border-terminal-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    post.image.startsWith("/public/")
                      ? post.image.replace("/public", "")
                      : post.image
                  }
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                size="sm"
                className="bg-terminal-header border-terminal-border"
                onClick={() => {
                  // Replace with your GitHub repo URL
                  window.open(
                    `https://github.com/KhalidEchchahid/Terminal_Portfolio-/tree/main/content/blog/${post.slug}.mdx`
                  );
                }}
              >
                <Github className="h-4 w-4 mr-2" />
                Edit on GitHub
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-terminal-header border-terminal-border"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast( "Link copied!",{
                    description: "The link has been copied to your clipboard.",
                  })
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-8">
                <div className="border border-terminal-border rounded-lg p-4 bg-terminal-header-dark mb-4">
                  <h2 className="text-lg font-bold text-terminal-green mb-4">
                    Table of Contents
                  </h2>
                  <TableOfContents />
                </div>

                <div className="text-sm text-terminal-text-dim">
                  <p className="mb-2">Keyboard shortcuts:</p>
                  <ul className="space-y-1">
                    <li>
                      <kbd className="px-2 py-1 bg-terminal-header rounded text-xs">
                        Alt + ←
                      </kbd>{" "}
                      Previous post
                    </li>
                    <li>
                      <kbd className="px-2 py-1 bg-terminal-header rounded text-xs">
                        Alt + →
                      </kbd>{" "}
                      Next post
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-invert prose-terminal max-w-none">
                <MDXRemote source={post.content} components={mdxComponents} />
              </article>

              {/* Share buttons */}
              <div className="mt-12 py-6 border-t border-terminal-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-terminal-green">
                    Share this post
                  </h3>
                  <div className="flex space-x-2">
                    <ShareButtons title={post.title} slug={post.slug} />
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-terminal-green mb-6">
                    Related Posts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <article className="border border-terminal-border rounded-lg p-4 bg-terminal-header-dark hover:border-terminal-green transition-all duration-300">
                          <h4 className="font-medium text-terminal-green group-hover:text-terminal-yellow mb-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-terminal-text-dim line-clamp-2 mb-2">
                            {relatedPost.description}
                          </p>
                          <div className="flex items-center text-xs text-terminal-text-dim">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{relatedPost.readingTime} min read</span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Post Navigation */}
              <nav className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="p-4 border border-terminal-border rounded-lg bg-terminal-header-dark hover:border-terminal-green transition-colors"
                  >
                    <span className="text-terminal-text-dim flex items-center text-sm mb-2">
                      <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                    </span>
                    <h4 className="font-medium text-terminal-green">
                      {prevPost.title}
                    </h4>
                  </Link>
                )}

                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="p-4 border border-terminal-border rounded-lg bg-terminal-header-dark hover:border-terminal-green transition-colors md:text-right md:ml-auto"
                  >
                    <span className="text-terminal-text-dim flex items-center justify-end text-sm mb-2">
                      Next <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                    <h4 className="font-medium text-terminal-green">
                      {nextPost.title}
                    </h4>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
