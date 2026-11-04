"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { timings } from "@/lib/tokens";
import { useIntro, useT } from "./Providers";

/**
 * App splash, shown once per session. The animation is CSS (see .loader-* in globals.css),
 * so it plays before hydration. JS only decides when to leave.
 */
export function Loader() {
  const { loader, a11y } = useT();
  const { finishIntro } = useIntro();
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const left = useRef(false);

  const leave = useCallback(() => {
    if (left.current) return;
    left.current = true;
    try {
      sessionStorage.setItem("manami-intro", "1");
    } catch {}
    ref.current?.classList.add("is-leaving");
    document.documentElement.classList.remove("intro-lock");
    finishIntro();
    window.setTimeout(() => setGone(true), 480);
  }, [finishIntro]);

  useEffect(() => {
    if (document.documentElement.dataset.introSeen) {
      left.current = true;
      finishIntro();
      setGone(true);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Measured from navigation start, so slow hydration doesn't stretch the intro.
    const wait = reduced ? 300 : Math.max(0, timings.loaderMs - 450 - performance.now());
    const t = window.setTimeout(leave, wait);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") leave();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [finishIntro, leave]);

  if (gone) return null;

  return (
    <div ref={ref} id="intro-loader">
      <div className="relative">
        <div className="loader-glow" aria-hidden />
        <Logo className="loader-logo relative" />
      </div>
      <p aria-hidden className="loader-word mt-6 text-4xl font-extrabold tracking-tight text-text" dir="ltr">
        {[...loader.wordmark].map((c, i) => (
          <span key={i} style={{ ["--i" as string]: i }}>
            {c}
          </span>
        ))}
      </p>
      <p aria-hidden className="loader-tagline mt-2 text-xs font-medium text-body">
        {loader.tagline}
      </p>
      <div aria-hidden className="mt-7 h-[3px] w-40 overflow-hidden rounded-full bg-line">
        <div className="loader-bar h-full w-full rounded-full bg-accent" />
      </div>
      <button
        type="button"
        onClick={leave}
        className="link-slide absolute bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-body hover:text-text"
      >
        {a11y.skipIntro}
      </button>
    </div>
  );
}
