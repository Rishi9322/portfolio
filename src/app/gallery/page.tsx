import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography and design work by Rishi — event photography, posters, and visual identity pieces, each with the story behind it.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Gallery</h1>
      <p className="mt-4 max-w-xl text-muted">
        Photographs and design pieces, each with the one-line story behind it.
      </p>
      <div className="mt-10">
        <GalleryGrid />
      </div>
    </div>
  );
}
