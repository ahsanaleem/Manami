"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLang, useT } from "@/components/global/Providers";
import { Button } from "@/components/ui/Button";
import { Ghost } from "@/components/ui/Ghost";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { fx } from "@/lib/fx";
import { languages } from "@/lib/i18n";
import { durations, easeOutExpo, storeLinks } from "@/lib/tokens";

function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const { nav } = useT();
  return (
    <div role="group" aria-label={nav.language} className={`flex items-center gap-1 text-sm ${className}`}>
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={lang === l.code}
          onClick={() => lang !== l.code && setLang(l.code)}
          className={`min-h-10 min-w-10 rounded-lg px-2 font-medium transition-colors duration-200 ${
            lang === l.code ? "text-accent-ink" : "text-body hover:text-text"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { nav, a11y } = useT();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    if (!open) return;
    fx.lenis?.stop();
    firstLink.current?.focus();
    const btn = menuBtn.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      fx.lenis?.start();
      window.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#how"
        className="sr-only z-[80] rounded-lg bg-accent px-4 py-2 font-semibold text-black focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {a11y.skipToContent}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color] duration-300 ${
          scrolled
            ? "border-b border-border/70 bg-bg/70 py-2 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-4 md:py-5"
        }`}
      >
        <nav className="container-page flex items-center justify-between gap-4 px-[var(--gutter)] xl:px-0">
          <a href="#top" aria-label={nav.home} className="group flex min-h-11 items-center gap-2.5">
            <Ghost blinkKey={scrolled} className="w-7 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span dir="ltr" className="text-xl font-extrabold tracking-tight">
              manami
            </span>
          </a>
          <ul className="hidden items-center gap-7 xl:flex">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-slide text-sm font-medium whitespace-nowrap text-body transition-colors hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle className="hidden sm:grid" />
            <Button href={storeLinks.appStore} ghostCursor className="hidden !min-h-10 !px-3.5 !py-2 text-sm whitespace-nowrap min-[360px]:inline-flex sm:!px-[22px]">
              {nav.cta}
            </Button>
            <button
              ref={menuBtn}
              type="button"
              aria-label={open ? nav.closeMenu : nav.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[60] grid size-11 place-items-center rounded-xl xl:hidden"
            >
              <span className="relative block h-3.5 w-6">
                <span
                  className={`absolute inset-x-0 h-0.5 rounded bg-text transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-0.5 rounded bg-text transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center gap-8 overflow-y-auto bg-bg/95 px-[var(--gutter)] pt-20 pb-8 backdrop-blur-xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.micro }}
          >
            <motion.ul
              className="flex flex-col gap-3"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
            >
              {nav.links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    ref={i === 0 ? firstLink : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="inline-block py-1 text-[clamp(1.75rem,9vw,2.25rem)] font-bold"
                    variants={{
                      hidden: { y: "110%" },
                      show: { y: "0%", transition: { duration: durations.ui + 0.2, ease: easeOutExpo } },
                    }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
            <div className="-ms-2 flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle className="grid" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
