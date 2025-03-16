import ModernPortfolio from "@/components/3d/modern-poertfolio"
import { PortfolioButton } from "@/components/portfolio-button"
import { JsonLd } from "@/components/seo/json-ld"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | Khalid Echchahid",
  description: "Explore Khalid Echchahid's modern portfolio showcasing interactive web experiences and projects.",
  keywords: ["Khalid Echchahid", "portfolio", "web developer", "full-stack", "React", "Next.js", "Morocco"],
  alternates: {
    canonical: "https://khalidechchahid.me/3d_portfolio",
  },
}

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Khalid Echchahid - Portfolio",
    description: "Modern portfolio showcasing Khalid Echchahid's work and projects",
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
      <PortfolioButton position="bottom-left" label="Main Portfolio" showAfterScroll={false} />
      <ModernPortfolio />
    </>
  )
}

