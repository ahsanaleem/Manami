"use client";

import { lazy, type ComponentType } from "react";
import { Deferred } from "@/components/motion/Deferred";

// React.lazy rather than next/dynamic: dynamic adds a preload tag for every chunk, which defeats loading on approach.
function section<K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) {
  return { load, Component: lazy(() => load().then((m) => ({ default: m[name] }))) };
}

const how = section(() => import("./HowItWorks"), "HowItWorks");
const reading = section(() => import("./ReadingShowcase"), "ReadingShowcase");
const features = section(() => import("./Features"), "Features");
const social = section(() => import("./Social"), "Social");
const privacy = section(() => import("./Privacy"), "Privacy");
const pricing = section(() => import("./Pricing"), "Pricing");
const faq = section(() => import("./FAQ"), "FAQ");
const cta = section(() => import("./FinalCTA"), "FinalCTA");
const footer = section(() => import("./Footer"), "Footer");

/** Everything between the hero and the footer. See <Deferred> for how these load. */
export function LazySections() {
  return (
    <>
      {/* Reserves the pinned scroll length (100svh + PIN_LENGTH in HowItWorks), so anchors stay accurate before it mounts. */}
      <Deferred load={how.load} className="motion-safe:min-h-[360svh]">
        <how.Component />
      </Deferred>
      {[reading, features, social, privacy, pricing, faq, cta].map((s, i) => (
        <Deferred key={i} load={s.load}>
          <s.Component />
        </Deferred>
      ))}
    </>
  );
}

export function LazyFooter() {
  return (
    <Deferred load={footer.load}>
      <footer.Component />
    </Deferred>
  );
}
