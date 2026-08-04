export const site = {
  name: "MADE BY RISHI",
  author: "Rishi Poddar",
  tagline:
    "Software engineer and full-stack developer — I build AI-powered products and ship them to real users.",
  description:
    "Portfolio and blog of Rishi Poddar — software engineer and full-stack developer in Mumbai building AI-powered products with Next.js, Python, and Generative AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://madebyrishi.com",
  email: "rishipoddarr@gmail.com",
  location: "Mumbai, India",
  social: {
    github: "https://github.com/Rishi9322",
    linkedin: "https://www.linkedin.com/in/rishi-poddar",
  },
  resumePath: "/resume.pdf",
};

/*
  Cal.com booking — the second contact path: the form is for a question, this
  is for people who want time on the calendar. Plain links, not the embed, so
  no third-party script and no cookies (see the footer claim).

  The /secret event is deliberately absent: it is a share-selectively link, and
  listing it here would publish it to everyone.
*/
export const booking = {
  profile: "https://cal.com/rishi-poddar-qcc99l",
  options: [
    {
      label: "Quick intro",
      minutes: 15,
      url: "https://cal.com/rishi-poddar-qcc99l/15min",
      note: "A short hello — role, project, or just to put a face to the work.",
    },
    {
      label: "Proper chat",
      minutes: 30,
      url: "https://cal.com/rishi-poddar-qcc99l/30min",
      note: "Enough time to walk through a brief, a case study, or an interview.",
    },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
