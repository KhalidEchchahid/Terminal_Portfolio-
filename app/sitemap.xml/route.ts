import { getBlogPosts } from "@/lib/mdx"

export async function GET() {
  const baseUrl = "https://khalidechchahid.me"

  // Get all blog posts
  const posts = getBlogPosts()

  // Format date properly for sitemap (YYYY-MM-DD format)
  const formatDateForSitemap = (date: Date): string => {
    return date.toISOString().split("T")[0] // Returns YYYY-MM-DD format
  }

  const currentDate = formatDateForSitemap(new Date())

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
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${posts
    .map((post) => {
      // Format the post date properly
      const postDate = new Date(post.date)
      const formattedDate = formatDateForSitemap(postDate)

      return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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


