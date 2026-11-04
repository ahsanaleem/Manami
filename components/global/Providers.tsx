"use client";

import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { fx } from "@/lib/fx";
import { dictionaries, type Lang } from "@/lib/i18n";
import { timings } from "@/lib/tokens";

type LangCtx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  /** 1 in LTR, -1 in RTL. Multiply horizontal motion by this so it follows reading direction. */
  sign: 1 | -1;
  setLang: (l: Lang) => void;
};
type IntroCtx = { introDone: boolean; finishIntro: () => void };
export type Theme = "light" | "dark";
type ThemeCtx = {
  theme: Theme;
  /** Pass the click point, and the new theme wipes outward from it. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

// Separate contexts, so ending the intro or changing theme doesn't re-render every component that reads a translation.
const LangContext = createContext<LangCtx | null>(null);
const IntroContext = createContext<IntroCtx | null>(null);
const ThemeContext = createContext<ThemeCtx | null>(null);

const THEME_WIPE_MS = 650;

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  fx.lightTheme = next === "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f6f5fc" : "#0a0e24");
  window.dispatchEvent(new Event("manami:theme"));
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("Wrap the page in <Providers>");
  return ctx;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("Wrap the page in <Providers>");
  return ctx;
}
export const useT = () => dictionaries[useLang().lang];
export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("Wrap the page in <Providers>");
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [introDone, setIntroDone] = useState(false);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("manami-lang");
      if (stored === "ar" || stored === "fr") setLangState(stored);
    } catch {}
    delete document.documentElement.dataset.langPending;
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    const el = fadeRef.current;
    if (el) el.style.opacity = "0";
    window.setTimeout(() => {
      setLangState(next);
      try {
        localStorage.setItem("manami-lang", next);
      } catch {}
      if (el) el.style.opacity = "1";
    }, timings.langFadeMs);
  }, []);

  const finishIntro = useCallback(() => setIntroDone(true), []);

  // The boot script in layout.tsx has already picked the theme before first paint: dark, unless the visitor chose light.
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const current: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
    applyTheme(current);
  }, []);

  const toggleTheme = useCallback<ThemeCtx["toggleTheme"]>((origin) => {
    const next: Theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("manami-theme", next);
    } catch {}
    setTheme(next);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) {
      applyTheme(next);
      return;
    }
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const wipe = document.startViewTransition(() => applyTheme(next));
    wipe.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: THEME_WIPE_MS, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  }, []);
  const themeValue = useMemo<ThemeCtx>(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  const langValue = useMemo<LangCtx>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", sign: lang === "ar" ? -1 : 1, setLang }),
    [lang, setLang],
  );
  const introValue = useMemo<IntroCtx>(() => ({ introDone, finishIntro }), [introDone, finishIntro]);

  return (
    <LangContext.Provider value={langValue}>
      <IntroContext.Provider value={introValue}>
        <ThemeContext.Provider value={themeValue}>
          <MotionConfig reducedMotion="user">
            <div ref={fadeRef} style={{ transition: `opacity ${timings.langFadeMs}ms ease` }}>
              {children}
            </div>
          </MotionConfig>
        </ThemeContext.Provider>
      </IntroContext.Provider>
    </LangContext.Provider>
  );
}
