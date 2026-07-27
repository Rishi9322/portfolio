"use client";

import { motion, useReducedMotion } from "framer-motion";

/*
  Signature animation — PRD §5.1: one tasteful typographic reveal.
  No scroll-jacking, no intro screen; content is in the DOM immediately.
*/
export function HeroTitle({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
        {text}
      </h1>
    );
  }

  return (
    <h1
      aria-label={text}
      className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.21, 0.47, 0.32, 0.98],
              delay: 0.08 * i,
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
