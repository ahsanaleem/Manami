"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

function mediaStore(query: string) {
  return {
    subscribe(cb: () => void) {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    get: () => window.matchMedia(query).matches,
  };
}

const reduced = mediaStore("(prefers-reduced-motion: reduce)");
const finePointer = mediaStore("(hover: hover) and (pointer: fine)");

/** False during SSR and hydration, then the real value, so markup always matches. */
export function useReduced() {
  return useSyncExternalStore(reduced.subscribe, reduced.get, () => false);
}

export function useFinePointer() {
  return useSyncExternalStore(finePointer.subscribe, finePointer.get, () => false);
}

/** True while the element is near the viewport. Use it to pause off-screen work. */
export function useOnScreen(ref: RefObject<Element | null>, rootMargin = "100px") {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return on;
}
