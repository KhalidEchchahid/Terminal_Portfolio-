import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Define your website metadata with personal branding focus
export const metadata: Metadata = {
  metadataBase: new URL("https://khalidechchahid.me"),
  title: {
    default: "Khalid Echchahid | Software Engineer & Developer Portfolio",
    template: "%s | Khalid Echchahid",
  },
  description:
    "The terminal-inspired portfolio of Khalid Echchahid, Software Engineer",
  keywords: [
    "Khalid Echchahid",
    "software engineer",
    "web developer",
    "portfolio",
    "terminal",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "frontend developer",
    "backend developer",
  ],
  authors: [
    {
      name: "Khalid Echchahid",
      url: "https://github.com/khalidechchahid",
    },
  ],
  creator: "Khalid Echchahid",
  publisher: "Khalid Echchahid",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khalidechchahid.me",
    siteName: "Khalid Echchahid - Software Engineer",
    title: "Khalid Echchahid | Software Engineer",
    description:
      "Khalid Echchahid is a passionate software engineering student with a strong interest in building real-world applications and solving complex problems. He has experience in full-stack development, DevOps, and system architecture, with a focus on creating efficient and scalable solutions. Always eager to learn and grow, Khalid enjoys exploring new technologies and sharing knowledge with others.",
    images: [
      {
        url: "/public/khalid.jpg",
        width: 1200,
        height: 630,
        alt: "Khalid Echchahid - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid Echchahid | Software Engineer",
    description:
    "Khalid Echchahid is a passionate software engineering student with a strong interest in building real-world applications and solving complex problems. He has experience in full-stack development, DevOps, and system architecture, with a focus on creating efficient and scalable solutions. Always eager to learn and grow, Khalid enjoys exploring new technologies and sharing knowledge with others.",
    creator: "@khalidechchahid",
    images: ["/public/khalid.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/khalid16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/khalid32x32.png", sizes: "32x32", type: "image/png" },
    ],
    // apple: [{ url: "/apple-touch-icon.png" }],
    // other: [
    //   {
    //     rel: "mask-icon",
    //     url: "/safari-pinned-tab.svg",
    //   },
    // ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://khalidechchahid.me",
    languages: {
      "en-US": "https://khalidechchahid.me",
    },
  },
  // verification: {
  //   google: "your-google-site-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   bing: "your-bing-verification-code",
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Add structured data for personal identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Khalid Echchahid",
              url: "https://khalidechchahid.me",
              image: "/public/khalid.jpg",
              sameAs: [
                "https://github.com/khalidechchahid",
                "https://www.linkedin.com/in/khalid-echchahid",
              ],
              jobTitle: "Software Engineer",
    
              description:
              "Khalid Echchahid is a passionate software engineering student with a strong interest in building real-world applications and solving complex problems. He has experience in full-stack development, DevOps, and system architecture, with a focus on creating efficient and scalable solutions. Always eager to learn and grow, Khalid enjoys exploring new technologies and sharing knowledge with others.",
              knowsAbout: ["JavaScript", "React", "Next.js", "TypeScript", "Web Development", "Terminal Applications"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}

