"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { durations, easeOutExpo } from "@/lib/tokens";
import { useFinePointer, useReduced } from "./hooks";

const show = { duration: durations.section, ease: easeOutExpo };
const withBlur: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: show },
};
// Animating a filter on text repaints every frame, which phones can't always keep up with.
const noBlur: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: show },
};
const calm: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: durations.ui } },
};

function useVariants(sharp?: boolean) {
  const reduced = useReduced();
  const fine = useFinePointer();
  if (reduced) return calm;
  return fine && !sharp ? withBlur : noBlur;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Seconds between <RevealItem> children. Leave unset to reveal this element itself. */
  stagger?: number;
  /** Set to control timing by hand, for example to wait for the loader. */
  play?: boolean;
  /** Skip the blur, for elements that animate during page load. */
  sharp?: boolean;
};

export function Reveal({ children, className, delay = 0, stagger, play, sharp }: RevealProps) {
  const variants = useVariants(sharp);
  const triggers =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "-8% 0px" } }
      : { animate: play ? "show" : "hidden" };
  return (
    <motion.div
      className={className}
      initial="hidden"
      {...triggers}
      variants={
        stagger !== undefined
          ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
          : variants
      }
      transition={stagger === undefined ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const variants = useVariants();
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
