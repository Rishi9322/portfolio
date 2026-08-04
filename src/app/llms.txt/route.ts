import { getWork, getPosts } from "@/lib/content";
import { externalPosts } from "@/lib/external-posts";
import { projectGroups } from "@/lib/projects";
import { site, booking } from "@/lib/site";

export const dynamic = "force-static";

/*
  /llms.txt — https://llmstxt.org

  A single curated markdown file so an LLM can understand this site without
  crawling and stripping every page. Generated from the same content the site
  renders, so it can never drift out of date.
*/
export async function GET() {
  const work = getWork();
  const posts = getPosts();

  const lines: string[] = [];

  lines.push(`# ${site.author} — ${site.name}`);
  lines.push("");
  lines.push(`> ${site.tagline} Based in ${site.location}.`);
  lines.push("");
  lines.push(
    "Portfolio, case studies, and writing. Case studies carry the full story of a build; projects are the complete public repository list; the blog mixes posts hosted here with articles published on Medium."
  );
  lines.push("");

  lines.push("## Case studies");
  lines.push("");
  for (const w of work) {
    lines.push(
      `- [${w.frontmatter.title}](${site.url}/work/${w.slug}): ${w.frontmatter.outcome}`
    );
  }
  lines.push("");

  for (const group of projectGroups) {
    lines.push(`## Projects — ${group.title}`);
    lines.push("");
    for (const p of group.projects) {
      const target = p.repo ?? p.live ?? site.url;
      lines.push(`- [${p.name}](${target}): ${p.blurb} Stack: ${p.stack.join(", ")}.`);
    }
    lines.push("");
  }

  lines.push("## Writing");
  lines.push("");
  for (const p of posts) {
    lines.push(
      `- [${p.frontmatter.title}](${site.url}/blog/${p.slug}): ${p.frontmatter.description}`
    );
  }
  for (const p of externalPosts) {
    lines.push(`- [${p.title}](${p.url}): ${p.description} (published on ${p.source})`);
  }
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push(`- [Contact form](${site.url}/contact): Send a message directly.`);
  lines.push(`- [Email](mailto:${site.email}): ${site.email}`);
  for (const slot of booking.options) {
    lines.push(`- [Book a ${slot.minutes}-minute call](${slot.url}): ${slot.note}`);
  }
  lines.push(`- [GitHub](${site.social.github})`);
  lines.push(`- [LinkedIn](${site.social.linkedin})`);
  lines.push(`- [Resume (PDF)](${site.url}${site.resumePath})`);
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [RSS feed](${site.url}/feed.xml): All writing, newest first.`);
  lines.push(`- [Sitemap](${site.url}/sitemap.xml): Every indexable URL.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
