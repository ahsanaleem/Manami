"use client";

import { animate } from "motion/react";
import { useEffect, useRef } from "react";
import { useFinePointer, useReduced } from "@/components/motion/hooks";
import { LOGO_BODY, LOGO_PILLOW, LOGO_VIEWBOX } from "@/lib/logo";

type LogoProps = {
  className?: string;
  /** The mark settles against its pillow in a slow breath. */
  breathe?: boolean;
  /** Gives a small pulse whenever this value changes. */
  nudgeKey?: unknown;
  title?: string;
};

/**
 * The Manami mark, with body and pillow as separate parts so each can animate.
 * Colours come from --logo-body and --logo-pillow: navy on light, and a light mark on dark, where navy would vanish.
 */
export function Logo({ className, breathe, nudgeKey, title }: LogoProps) {
  const ref = useRef<SVGSVGElement>(null);
  const fine = useFinePointer();
  const reduced = useReduced();

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduced || !ref.current) return;
    const controls = animate(ref.current, { scale: [1, 1.14, 1] }, { duration: 0.35 });
    return () => controls.stop();
  }, [nudgeKey, reduced]);

  // Animated SVG parts repaint every frame, so the breath only runs on desktop.
  const alive = breathe && fine && !reduced;

  return (
    <svg
      ref={ref}
      viewBox={LOGO_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path data-part="pillow" d={LOGO_PILLOW} fill="var(--logo-pillow)" fillRule="evenodd" className={alive ? "logo-pillow-breathe" : undefined} />
      <path data-part="body" d={LOGO_BODY} fill="var(--logo-body)" fillRule="evenodd" className={alive ? "logo-body-breathe" : undefined} />
    </svg>
  );
}
