"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

/** Pauses every CSS animation inside it while it is off-screen. */
export function LoopGate({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => el.setAttribute("data-offscreen", String(!e.isIntersecting)),
      { rootMargin: "80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-offscreen="true" {...props}>
      {children}
    </div>
  );
}
