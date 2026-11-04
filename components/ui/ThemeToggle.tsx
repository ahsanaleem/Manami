"use client";

import { motion } from "motion/react";
import { useT, useTheme } from "@/components/global/Providers";
import { spring } from "@/lib/tokens";

/** Sun and moon swap through CSS (.theme-icon), so the right one shows before hydration. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { nav } = useT();
  return (
    <motion.button
      type="button"
      aria-label={theme === "light" ? nav.themeDark : nav.themeLight}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={spring}
      className={`relative size-11 shrink-0 place-items-center rounded-full text-body transition-colors hover:text-text ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="theme-icon theme-icon-sun absolute inset-0 m-auto size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400" />
      </svg>
      <svg viewBox="0 0 24 24" className="theme-icon theme-icon-moon absolute inset-0 m-auto size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
        <path d="M21 12.800A9 9 0 1 1 11.200 3a7 7 0 0 0 9.800 9.800z" />
      </svg>
    </motion.button>
  );
}
