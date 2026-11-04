"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useLang } from "./Providers";

export function ScrollProgress() {
  const { dir } = useLang();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-accent"
      style={{ scaleX, transformOrigin: dir === "rtl" ? "right center" : "left center" }}
    />
  );
}
