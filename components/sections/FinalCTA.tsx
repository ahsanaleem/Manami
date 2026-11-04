"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/global/Providers";
import { GlowPulse } from "@/components/motion/GlowPulse";
import { useReduced } from "@/components/motion/hooks";
import { LoopGate } from "@/components/motion/LoopGate";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { StoreButtons } from "@/components/ui/Button";
import { Ghost } from "@/components/ui/Ghost";
import { fx } from "@/lib/fx";

const STAR_BOOST = 1.7; // star brightness while this section is on screen

export function FinalCTA() {
  const { cta, a11y } = useT();
  const reduced = useReduced();
  const ref = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const awake = useInView(ghostRef, { amount: 0.75 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 60%"] });
  // On a phone the headline sits right below the ghost, so a long rise would slide the ghost under it.
  const [rise, setRise] = useState(320);
  useEffect(() => {
    const measure = () => setRise(window.innerWidth < 768 ? 90 : 320);
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [rise, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.72, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      fx.starBoost = e.isIntersecting ? STAR_BOOST : 1;
    });
    io.observe(el);
    return () => {
      io.disconnect();
      fx.starBoost = 1;
    };
  }, []);

  return (
    <section id="get-app" ref={ref} className="section relative flex items-center overflow-hidden md:min-h-svh">
      <LoopGate className="container-page relative flex flex-col items-center text-center">
        <GlowPulse className="top-0 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/4 md:size-[760px]" />
        <motion.div ref={ghostRef} className="relative mb-6 w-28 md:mb-8 md:w-48" style={{ y, scale }}>
          <div className={awake && !reduced ? "ghost-wiggle" : undefined}>
            <Ghost eyesOpen={awake || reduced} blink={awake} follow hemWave title={a11y.mascot} className="w-full" />
          </div>
        </motion.div>
        <SplitText text={cta.headline} className="display relative max-w-[16ch] text-[clamp(2.1rem,9.6vw,3.5rem)] md:text-[clamp(2.5rem,7vw,5.5rem)]" />
        <Reveal delay={0.2} className="relative">
          <p className="mt-5 text-body md:text-lg">{cta.sub}</p>
        </Reveal>
        <Reveal delay={0.3} className="relative mt-6 w-full sm:w-auto md:mt-8">
          <StoreButtons className="justify-center" />
        </Reveal>
      </LoopGate>
    </section>
  );
}
