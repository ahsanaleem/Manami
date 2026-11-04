"use client";

import { motion, type Variants } from "motion/react";
import { createElement } from "react";
import { spring } from "@/lib/tokens";
import { useReduced } from "./hooks";

type SplitTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** "char" falls back to words for connected scripts such as Arabic. */
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  /** Set to control timing by hand. Otherwise it plays when scrolled into view. */
  play?: boolean;
};

const unit: Variants = {
  hidden: { y: "110%", rotate: 6 },
  show: { y: "0%", rotate: 0, transition: spring },
};

const hasArabic = (s: string) => /[؀-ۿ]/.test(s);

export function SplitText({ text, as = "h2", className, by = "word", delay = 0, stagger = 0.045, play }: SplitTextProps) {
  const reduced = useReduced();
  const splitChars = by === "char" && !hasArabic(text);
  const triggers =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "-8% 0px" } }
      : { animate: play ? "show" : "hidden" };

  if (reduced) {
    return createElement(
      as,
      { className },
      <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        {text}
      </motion.span>,
    );
  }

  const words = text.split(" ");
  return createElement(
    as,
    { className },
    <span className="sr-only">{text}</span>,
    <motion.span
      key={text}
      aria-hidden
      initial="hidden"
      {...triggers}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i}>
          {/* The padding keeps ascenders and descenders inside the mask. */}
          <span className="inline-block overflow-hidden whitespace-nowrap py-[0.14em] -my-[0.14em] align-bottom">
            {splitChars ? (
              [...word].map((ch, c) => (
                <motion.span key={c} className="inline-block origin-bottom-left will-change-transform" variants={unit}>
                  {ch}
                </motion.span>
              ))
            ) : (
              <motion.span className="inline-block origin-bottom-left will-change-transform" variants={unit}>
                {word}
              </motion.span>
            )}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>,
  );
}
