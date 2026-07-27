export const site = {
  name: "MADE BY RISHI",
  author: "Rishi",
  // TODO(Week 0 content audit): replace with the real positioning line — PRD §4A.
  tagline:
    "Creative technologist — I build products, shoot stories, and design experiences.",
  description:
    "Portfolio and blog of Rishi — creative technologist taking ideas from concept to reality: products, photography, and design.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://madebyrishi.com",
  email: "rajendra.thakkar@gmail.com",
  social: {
    github: "https://github.com/rishi", // TODO: real handle
    linkedin: "https://www.linkedin.com/in/rishi", // TODO: real handle
    instagram: "https://www.instagram.com/rishi", // TODO: real handle
  },
  resumePath: "/resume.pdf",
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
