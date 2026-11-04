"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useReduced } from "@/components/motion/hooks";
import { LOGO_BODY, LOGO_PILLOW, LOGO_VIEWBOX } from "@/lib/logo";

const RING_FOLLOW = 0.18; // lower means a lazier trail
const INTERACTIVE = "a, button, [role='button'], summary, [data-cursor]";

/** Dot plus trailing ring. Desktop only. The ring grows on interactive elements. */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReduced();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const d = dot.current!;
    const r = ring.current!;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let seen = false;

    const frame = () => {
      rx += (tx - rx) * RING_FOLLOW;
      ry += (ty - ry) * RING_FOLLOW;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      // Sleep once the ring catches up, then the next pointer move wakes it.
      raf = Math.abs(tx - rx) + Math.abs(ty - ry) > 0.1 ? requestAnimationFrame(frame) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      d.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (!seen) {
        seen = true;
        rx = tx;
        ry = ty;
        d.style.opacity = "1";
        r.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element).closest?.(INTERACTIVE);
      r.classList.toggle("is-hover", !!el);
      r.classList.toggle("is-logo", el?.getAttribute("data-cursor") === "logo");
    };
    const onLeave = () => {
      seen = false;
      d.style.opacity = "0";
      r.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      html.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <div className="cursor-ring-inner">
          <svg viewBox={LOGO_VIEWBOX} className="cursor-logo">
            <path d={LOGO_PILLOW} fill="var(--logo-pillow)" fillRule="evenodd" />
            <path d={LOGO_BODY} fill="var(--logo-body)" fillRule="evenodd" />
          </svg>
        </div>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
