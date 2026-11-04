"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReduced } from "./hooks";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Pixels moved across the element's trip through the viewport. Negative moves against the scroll. */
  speed?: number;
};

export function Parallax({ children, className, speed = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-speed / 2, speed / 2]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
