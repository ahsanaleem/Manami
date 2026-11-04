"use client";

import { useEffect } from "react";
import { useIntro } from "@/components/global/Providers";
import { fx } from "@/lib/fx";
import { useReduced } from "./hooks";

/**
 * Lenis driven by the GSAP ticker, so pinned sequences and smooth scroll stay in step.
 * Both libraries load after the intro, because nothing can scroll before then.
 */
export function SmoothScroll() {
  const reduced = useReduced();
  const { introDone } = useIntro();

  useEffect(() => {
    if (reduced || !introDone) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      // Lenis also applies the page's scroll-padding-top. The offset cancels it, so anchors land exactly on a
      // section, whose own padding clears the nav. The scroll-padding stays for keyboard focus.
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: 88 } });
      fx.lenis = lenis;
      const onScroll = () => {
        fx.velocity = lenis.velocity;
        ScrollTrigger.update();
      };
      lenis.on("scroll", onScroll);
      const tick = (time: number) => {
        lenis.raf(time * 1000);
        // Lenis stops emitting once settled, so let the velocity decay here.
        if (!lenis.isScrolling) fx.velocity *= 0.9;
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        fx.lenis = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced, introDone]);

  return null;
}
