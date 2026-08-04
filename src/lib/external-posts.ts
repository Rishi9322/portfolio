/*
  Writing published on Medium (medium.com/@rishipoddarr) rather than here.

  These are listed, not copied: the canonical version stays on Medium so the
  site never competes with itself in search. Reading times are the real word
  counts from the Medium feed at /200 wpm. Refresh from
  https://medium.com/feed/@rishipoddarr when new posts go up.
*/

export type ExternalPost = {
  title: string;
  url: string;
  source: string;
  date: string; // ISO
  description: string;
  readingTimeMinutes: number;
  tags: string[];
};

export const externalPosts: ExternalPost[] = [
  {
    title:
      "Leveling Up with Gemini: What I Learned from the Intermediate Generative AI Skill Badge on Vertex AI",
    url: "https://medium.com/@rishipoddarr/leveling-up-with-gemini-what-i-learned-from-the-intermediate-generative-ai-skill-badge-on-vertex-81563391f280",
    source: "Medium",
    date: "2025-05-17",
    description:
      "Going past text prompts into multimodal generation, function calling, and media analysis with the Vertex AI Gemini API — and why the intermediate badge is the one that actually changes how you build.",
    readingTimeMinutes: 3,
    tags: ["Gemini", "Vertex AI", "Generative AI"],
  },
  {
    title:
      "Unlocking the Power of Multimodal AI: Earning the Gemini Multimodal RAG Skill Badge",
    url: "https://medium.com/@rishipoddarr/unlocking-the-power-of-multimodal-ai-earning-the-gemini-multimodal-rag-skill-badge-16dedb385819",
    source: "Medium",
    date: "2025-05-11",
    description:
      "Using Gemini to read rich documents — pulling structured meaning out of text and images together, and wiring it into a multimodal RAG pipeline on Google Cloud.",
    readingTimeMinutes: 2,
    tags: ["Gemini", "RAG", "Multimodal"],
  },
  {
    title: "Building Generative AI Applications with Google Gemini and Streamlit",
    url: "https://medium.com/@rishipoddarr/building-generative-ai-applications-with-google-gemini-and-streamlit-80e2f9729516",
    source: "Medium",
    date: "2025-05-04",
    description:
      "Prompt structure, function calling through the Gemini Python SDK, and putting the whole thing behind a Streamlit front end that someone can actually use.",
    readingTimeMinutes: 1,
    tags: ["Gemini", "Streamlit", "Python"],
  },
  {
    title: "Building Real-World AI Applications with Google's Gemini and Imagen",
    url: "https://medium.com/@rishipoddarr/building-real-world-ai-applications-with-googles-gemini-and-imagen-49101431b4ae",
    source: "Medium",
    date: "2025-04-27",
    description:
      "What Gemini and Imagen are each good for — image recognition and natural language on one side, image generation on the other — and where the two meet in a real application.",
    readingTimeMinutes: 3,
    tags: ["Gemini", "Imagen", "Google Cloud"],
  },
  {
    title:
      'What I Learned from the "Introductory Prompt Design in Vertex AI" Skill Badge by Google Cloud',
    url: "https://medium.com/@rishipoddarr/what-i-learned-from-the-introductory-prompt-design-in-vertex-ai-skill-badge-by-google-cloud-1668aa48a573",
    source: "Medium",
    date: "2025-04-26",
    description:
      "Prompt engineering, image analysis, and multimodal techniques in Vertex AI — the argument that knowing how to guide a model matters more than knowing it exists.",
    readingTimeMinutes: 3,
    tags: ["Prompt Design", "Vertex AI", "Google Cloud"],
  },
];
