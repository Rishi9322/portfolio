"use client";

import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

export function ResumeLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={site.resumePath}
      download
      className={className}
      onClick={() => track("resume_download")}
    >
      {children ?? "Resume"}
    </a>
  );
}
