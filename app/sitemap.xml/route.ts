import { BlogPost, getBlogPosts } from "@/lib/mdx"

export async function GET() {
  const baseUrl = "https://khalidechchahid.me"

  // Get all blog posts
  let posts: BlogPost[] = []
  try {
    posts = getBlogPosts()
  } catch (error) {
    console.error("Error getting blog posts for sitemap:", error)
    // Continue with empty posts array if there's an error
  }

  // Format date properly for sitemap (YYYY-MM-DD format)
  const formatDateForSitemap = (dateString: string): string => {
    try {
      const date = new Date(dateString)

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return new Date().toISOString().split("T")[0] // Return today's date if invalid
      }

      return date.toISOString().split("T")[0] // Returns YYYY-MM-DD format
    } catch (error) {
      return new Date().toISOString().split("T")[0] // Return today's date if there's an error
    }
  }

  const currentDate = formatDateForSitemap(new Date().toISOString())

  // Create XML sitemap with properly formatted dates
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/3d_portfolio</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts
    .map((post) => {
      // Format the post date properly
      const formattedDate = formatDateForSitemap(post.date)

      return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    })
    .join("")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

