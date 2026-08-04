"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { galleryItems, type GalleryItem } from "@/lib/gallery";

const TABS = [
  { key: "all", label: "All" },
  { key: "photography", label: "Photography" },
  { key: "design", label: "Design" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const ASPECT: Record<GalleryItem["aspect"], string> = {
  portrait: "aspect-3/4",
  landscape: "aspect-4/3",
  square: "aspect-square",
};

function Media({ item, sizes }: { item: GalleryItem; sizes?: string }) {
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={sizes}
        className="object-cover"
        placeholder="empty"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={item.alt}
      className="flex h-full w-full items-center justify-center bg-linear-to-br from-subtle to-border p-4 text-center font-display text-lg text-muted/60"
    >
      {item.title}
    </div>
  );
}

export function GalleryGrid() {
  const [tab, setTab] = useState<TabKey>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const items =
    tab === "all" ? galleryItems : galleryItems.filter((i) => i.category === tab);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  return (
    <div>
      {/* Filter tabs — PRD §5.3 */}
      <div role="tablist" aria-label="Gallery filter" className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-foreground text-background"
                : "border border-border hover:border-accent hover:text-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Masonry via CSS columns; captions always visible (no hover-only) */}
      <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((item) => (
          <figure key={item.id} className="mb-5 break-inside-avoid">
            <button
              onClick={() => setActive(item)}
              className="block w-full overflow-hidden rounded-xl border border-border transition-colors hover:border-accent"
              aria-label={`Open ${item.title} in lightbox`}
            >
              <div className={`relative ${ASPECT[item.aspect]}`}>
                <Media item={item} sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
            </button>
            <figcaption className="mt-2 text-sm text-muted">
              <span className="font-medium text-foreground">{item.title}</span>{" "}
              — {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setActive(null);
        }}
        className="m-auto w-[min(92vw,900px)] rounded-2xl bg-background p-0 backdrop:bg-foreground/80"
      >
        {active && (
          <figure>
            <div className={`relative w-full ${ASPECT[active.aspect]} max-h-[75vh]`}>
              <Media item={active} sizes="92vw" />
            </div>
            <figcaption className="flex items-start justify-between gap-4 p-5">
              <p className="text-sm text-muted">
                <span className="font-medium text-foreground">{active.title}</span>{" "}
                — {active.caption}
              </p>
              <button
                onClick={() => setActive(null)}
                className="rounded-full border border-border px-3 py-1 text-sm hover:border-accent hover:text-accent"
              >
                Close
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </div>
  );
}
