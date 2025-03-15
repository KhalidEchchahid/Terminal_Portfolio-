"use client";

import { useState } from "react";
import { Download, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResumeDownloader() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    // Create a link element
    const link = document.createElement("a");
    link.href = "/ECV.pdf";
    link.download = "khalid-Echchahid.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    //success state after a brief delay
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsDownloaded(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="py-2">
      <div className="flex items-center mb-2">
        <FileText className="h-5 w-5 text-terminal-green mr-2" />
        <span className="text-terminal-green font-semibold">
          Resume Available
        </span>
      </div>

      <p className="text-terminal-text-dim mb-3">
        Download my resume to learn more about my experience, skills, and
        qualifications.
      </p>

      <div className="flex items-center">
        <Button
          onClick={handleDownload}
          disabled={isDownloading || isDownloaded}
          className={`flex items-center gap-2 ${
            isDownloaded
              ? "bg-terminal-green text-black"
              : "bg-terminal-header-dark hover:bg-terminal-header-light"
          }`}
        >
          {isDownloading ? (
            <>
              <span className="animate-pulse">Downloading...</span>
            </>
          ) : isDownloaded ? (
            <>
              <Check className="h-4 w-4" />
              <span>Downloaded</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download Resume (PDF)</span>
            </>
          )}
        </Button>
      </div>

      <div className="mt-2 text-xs text-terminal-text-dim">
        <span className="text-terminal-yellow">TIP:</span> You can also type{" "}
        <kbd className="px-1 py-0.5 bg-terminal-header-light rounded">
          open resume
        </kbd>{" "}
        to view it in the browser.
      </div>
    </div>
  );
}
