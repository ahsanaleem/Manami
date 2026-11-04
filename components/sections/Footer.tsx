"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useT } from "@/components/global/Providers";
import { Logo } from "@/components/ui/Logo";
import { spring } from "@/lib/tokens";

// Replace the hrefs with the real profiles.
const SOCIALS: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.500" />
        <circle cx="16.800" cy="7.200" r="0.600" fill="currentColor" />
      </>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: <path d="M14 4v10.500a3.500 3.500 0 1 1-3.500-3.500M14 4c.3 2.600 2 4.300 4.500 4.500" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    name: "X",
    href: "#",
    icon: <path d="m5 5 14 14M19 5 5 19" strokeLinecap="round" />,
  },
];

export function Footer() {
  const { footer } = useT();
  // Watches the mask, because the logo itself starts clipped and would never register as in view.
  const peek = useRef<HTMLDivElement>(null);
  const peeking = useInView(peek, { once: true });
  return (
    <footer className="relative border-t border-border bg-bg/60 px-[var(--gutter)] pt-10 pb-8 backdrop-blur-sm md:pt-14 md:pb-10">
      {/* The logo peeks over the top edge. The mask hides whatever is below the edge. */}
      <div ref={peek} aria-hidden className="absolute end-[12%] bottom-full h-9 w-24 overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: peeking ? "12%" : "100%" }}
          transition={{ ...spring, delay: 0.25 }}
        >
          <Logo className="w-full" />
        </motion.div>
      </div>

      <div className="container-page flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="w-12" />
            <span dir="ltr" className="text-xl font-extrabold tracking-tight">
              manami
            </span>
          </div>
          <p className="mt-2 text-sm text-body">{footer.tagline}</p>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 sm:flex sm:flex-wrap sm:gap-x-7">
          {footer.links.map((l) => (
            <li key={l.href} className="flex min-h-11 items-center">
              {/* The list item keeps a 44px row. Stretching the link itself would push its underline away from the text. */}
              <a href={l.href} className="link-slide py-3 text-sm text-body transition-colors after:bottom-2.5 hover:text-text">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex gap-2">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <motion.a
                href={s.href}
                aria-label={footer.socialLabel.replace("{name}", s.name)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.92 }}
                transition={spring}
                className="grid size-11 place-items-center rounded-full border border-border text-body transition-colors hover:border-accent-ink hover:text-accent-ink"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  {s.icon}
                </svg>
              </motion.a>
            </li>
          ))}
        </ul>
      </div>

      <p className="container-page mt-6 text-sm text-body md:mt-10">{footer.copyright}</p>
    </footer>
  );
}
