
import ThreeDPortfolioLite from "@/components/3d/three-d-portfolio-lite"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "3D Portfolio | Khalid Echchahid",
  description: "Explore Khalid Echchahid's 3D portfolio showcasing interactive web experiences and 3D projects.",
  keywords: ["Khalid Echchahid", "3D portfolio", "3D web", "interactive", "three.js", "WebGL", "Morocco"],
  alternates: {
    canonical: "https://khalidechchahid.me/3d_portfolio",
  },
}


export default function ThreeDPortfolioPage() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Khalid Echchahid - 3D Portfolio",
    description: "Interactive 3D portfolio showcasing Khalid Echchahid's work and projects",
    dateCreated: "2025-03-13",
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Person",
      name: "Khalid Echchahid",
      url: "https://khalidechchahid.me",
      nationality: "Moroccan",
      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: "Morocco",
        },
      },
    },
  }

  return (
    <>
          <JsonLd data={jsonLd} />
    <main className="min-h-screen bg-terminal-bg text-terminal-text relative">
      <ThreeDPortfolioLite />
    </main>
    </>
  )
}

