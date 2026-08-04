"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

/*
  Fires `case_study_complete` when the reader reaches the end — PRD §14.2.
  Feeds the §11 scroll-depth/completion metric.
*/
export function CaseStudyEnd({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !fired.current) {
          fired.current = true;
          track("case_study_complete", { slug });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [slug]);

  return <div ref={ref} aria-hidden="true" />;
}
