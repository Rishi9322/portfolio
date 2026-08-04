"use client";

import { motion, useReducedMotion } from "framer-motion";

/*
  Signature typographic reveal — PRD §5.1. Poster-style display type;
  the final word is hollow (outlined) in the accent, like an unfilled
  spot color on a proof print. Content is in the DOM immediately.
*/
export function HeroTitle({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const wordClass = (word: string) =>
    highlight && word.replace(/[.,!]/g, "") === highlight
      ? "text-highlight"
      : undefined;

  const h1Class =
    "font-display text-[13vw] font-bold uppercase leading-[0.95] tracking-tight sm:text-8xl";

  if (reduce) {
    return (
      <h1 className={h1Class}>
        {words.map((word, i) => (
          <span key={i} className={wordClass(word)}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 aria-label={text} className={h1Class}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className={`inline-block ${wordClass(word) ?? ""}`}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.21, 0.47, 0.32, 0.98],
              delay: 0.07 * i,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
