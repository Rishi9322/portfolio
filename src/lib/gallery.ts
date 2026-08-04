export type GalleryItem = {
  id: string;
  category: "photography" | "design";
  title: string;
  caption: string; // one-line story caption — PRD §5.3
  src?: string; // path under /public — absent until Week 0 assets are exported
  alt: string;
  aspect: "portrait" | "landscape" | "square";
};

/*
  SAMPLE DATA — replace after the Week 0 content audit exports the real
  20–30 photographs and 5–10 design pieces (WebP/AVIF, web-optimized).
  Items without `src` render as labeled placeholders.
*/
export const galleryItems: GalleryItem[] = [
  {
    id: "ph-1",
    category: "photography",
    title: "After the fest",
    caption: "The volunteer crew, 11pm, after everyone else went home.",
    alt: "Placeholder for an event photograph",
    aspect: "landscape",
  },
  {
    id: "ph-2",
    category: "photography",
    title: "Stairwell rehearsal",
    caption: "A first-year practicing lines in the only quiet spot.",
    alt: "Placeholder for a candid photograph",
    aspect: "portrait",
  },
  {
    id: "ph-3",
    category: "photography",
    title: "Sound check",
    caption: "Two hours before doors — the calm version of chaos.",
    alt: "Placeholder for a backstage photograph",
    aspect: "square",
  },
  {
    id: "ph-4",
    category: "photography",
    title: "Front row",
    caption: "The second laugh — the real one.",
    alt: "Placeholder for an audience photograph",
    aspect: "landscape",
  },
  {
    id: "de-1",
    category: "design",
    title: "Event app launch poster",
    caption: "Designed before the first line of Kotlin was written.",
    alt: "Placeholder for a launch poster design",
    aspect: "portrait",
  },
  {
    id: "de-2",
    category: "design",
    title: "Fest identity",
    caption: "One typeface, two colors, forty applications.",
    alt: "Placeholder for a festival identity design",
    aspect: "square",
  },
  {
    id: "de-3",
    category: "design",
    title: "Survey app onboarding",
    caption: "A government form, redesigned by a magazine.",
    alt: "Placeholder for an app onboarding design",
    aspect: "portrait",
  },
];
