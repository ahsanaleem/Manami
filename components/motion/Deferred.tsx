"use client";

import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";

type DeferredProps = {
  children: ReactNode;
  /** Loads the section's chunk. Mounting waits for it, so the server HTML never blanks out. */
  load: () => Promise<unknown>;
  className?: string;
  /** Once the reader has interacted, start loading when this close to the viewport. */
  margin?: string;
};

const INTERACTIONS = ["scroll", "keydown", "pointerdown", "touchstart"] as const;

/**
 * Hydrate on approach. The server renders the section as normal, for SEO and stable layout.
 * On the client the wrapper leaves that HTML untouched until the section is on screen,
 * or the reader has started moving and is getting close. Until then it costs no JS.
 */
export function Deferred({ children, load, className, margin = "1400px" }: DeferredProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const observers: IntersectionObserver[] = [];

    const stop = () => {
      observers.forEach((o) => o.disconnect());
      INTERACTIONS.forEach((t) => window.removeEventListener(t, widen));
    };
    const mount = () => {
      if (done) return;
      done = true;
      stop();
      load().then(() => startTransition(() => setMounted(true)));
    };
    const observe = (rootMargin: string) => {
      const io = new IntersectionObserver(
        // A ratio above zero ignores a section that only touches the viewport's edge.
        ([e]) => {
          if (rootMargin === "0px" ? e.intersectionRatio > 0 : e.isIntersecting) mount();
        },
        { rootMargin, threshold: [0, 0.01] },
      );
      io.observe(el);
      observers.push(io);
    };
    function widen() {
      INTERACTIONS.forEach((t) => window.removeEventListener(t, widen));
      // From here on, anchors and scroll positions need true heights rather than the .cv-skip estimate.
      el!.classList.remove("cv-skip");
      observe(`${margin} 0px`);
    }

    observe("0px");
    // A restored scroll position or #hash link has already moved the page.
    if (window.scrollY > 0 || window.location.hash) {
      widen();
      // Heights just became real, so put a #hash target back where it belongs.
      if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    } else INTERACTIONS.forEach((t) => window.addEventListener(t, widen, { passive: true }));
    return stop;
  }, [load, margin]);

  if (typeof window === "undefined" || mounted) {
    return (
      <div ref={ref} className={`${mounted ? "" : "cv-skip"} ${className ?? ""}`}>
        {children}
      </div>
    );
  }
  // An empty innerHTML with suppressed warnings tells React to keep the server's markup as it is.
  return <div ref={ref} className={`cv-skip ${className ?? ""}`} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} />;
}
