"use client";

import { useEffect } from "react";

/*
  WebMCP — https://developer.chrome.com/docs/ai/webmcp

  Exposes this site's content as tools a browser AI agent can call, so an agent
  answering "what has Rishi built with PyTorch?" can query structured data
  instead of scraping the DOM.

  Experimental: origin trial in Chrome 149+, otherwise behind
  chrome://flags/#enable-webmcp-testing. Every call is feature-detected and
  wrapped, so on the ~100% of browsers without it this component does nothing.

  All tools are read-only. Nothing here mutates state, sends a message, or
  books a meeting — an agent can describe how to make contact, but a human
  still has to do it.
*/

type ToolDescriptor = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (params: Record<string, never>) => Promise<unknown>;
};

type ModelContext = {
  registerTool: (
    tool: ToolDescriptor,
    options?: { signal?: AbortSignal }
  ) => Promise<unknown>;
};

export type WebMCPData = {
  projects: { name: string; blurb: string; stack: string[]; year: string; url?: string }[];
  work: { title: string; outcome: string; url: string; tags: string[] }[];
  posts: { title: string; description: string; url: string; date: string; source: string }[];
  contact: { email: string; booking: { label: string; minutes: number; url: string }[] };
};

export function WebMCPTools({ data }: { data: WebMCPData }) {
  useEffect(() => {
    const ctx = (document as unknown as { modelContext?: ModelContext }).modelContext;
    if (!ctx?.registerTool) return; // unsupported browser — do nothing

    const controller = new AbortController();
    const noArgs = { type: "object", properties: {} };

    const tools: ToolDescriptor[] = [
      {
        name: "listProjects",
        description:
          "List every project Rishi Poddar has built, with a short description, the technologies used, and the year.",
        inputSchema: noArgs,
        execute: async () => data.projects,
      },
      {
        name: "listCaseStudies",
        description:
          "List Rishi Poddar's in-depth case studies — the projects documented end to end, with the outcome of each.",
        inputSchema: noArgs,
        execute: async () => data.work,
      },
      {
        name: "listWriting",
        description:
          "List Rishi Poddar's blog posts and published articles, newest first.",
        inputSchema: noArgs,
        execute: async () => data.posts,
      },
      {
        name: "getContactOptions",
        description:
          "Get the ways to reach Rishi Poddar: email address and bookable call slots. Read-only — this does not send anything or book anything.",
        inputSchema: noArgs,
        execute: async () => data.contact,
      },
    ];

    Promise.all(
      tools.map((t) => ctx.registerTool(t, { signal: controller.signal }))
    ).catch((err) => console.error("[webmcp] tool registration failed", err));

    return () => controller.abort();
  }, [data]);

  return null;
}
