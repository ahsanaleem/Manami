"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { useT } from "@/components/global/Providers";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { durations, easeOutExpo, spring } from "@/lib/tokens";

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <motion.div
      layout="position"
      className={`glass overflow-hidden rounded-2xl border-s-[3px] transition-[border-color] duration-300 ${open ? "!border-s-accent-ink" : "hover:border-text/25"}`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-start font-medium md:px-6 md:text-lg"
        >
          {q}
          <motion.svg
            viewBox="0 0 24 24"
            className={`size-5 shrink-0 ${open ? "text-accent-ink" : "text-body"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.200"
            strokeLinecap="round"
            animate={{ rotate: open ? 45 : 0 }}
            transition={spring}
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" />
          </motion.svg>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: durations.ui, ease: easeOutExpo }}
          >
            <p className="max-w-[62ch] px-5 pb-5 leading-relaxed text-body md:px-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const { faq } = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section">
      <div className="container-page max-w-[820px]">
        <SplitText text={faq.title} className="display h2" />
        <Reveal stagger={0.07} className="mt-10 flex flex-col gap-3">
          {faq.items.map((item, i) => (
            <RevealItem key={item.q}>
              <Item q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
