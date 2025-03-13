export async function GET() {
    const baseUrl = "https://khalidechchahid.me"
  
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]
  
    // Create a simple XML sitemap with only the main pages
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${baseUrl}/3d_portfolio</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>
  </urlset>`
  
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  }
  
  