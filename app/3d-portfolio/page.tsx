"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ThreeDPortfolio from "@/components/3d/three-d-portfolio";

export default function ThreeDPortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-text relative">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-terminal-green border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-terminal-green text-lg">
            Loading 3D Experience...
          </p>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 z-10">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-terminal-header-dark/80 backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Terminal
              </Button>
            </Link>
          </div>
          <ThreeDPortfolio />
        </>
      )}
    </main>
  );
}
