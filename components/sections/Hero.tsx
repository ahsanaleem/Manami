"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIntro, useLang, useT } from "@/components/global/Providers";
import { GlowPulse } from "@/components/motion/GlowPulse";
import { useFinePointer, useReduced } from "@/components/motion/hooks";
import { LoopGate } from "@/components/motion/LoopGate";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { StoreButtons } from "@/components/ui/Button";
import { Ghost } from "@/components/ui/Ghost";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { HomeScreen } from "@/components/ui/screens";

const MAX_TILT = 9; // degrees the phone leans toward the cursor

export function Hero() {
  const { hero, a11y } = useT();
  const { introDone } = useIntro();
  const { sign } = useLang();
  const reduced = useReduced();
  const fine = useFinePointer();
  const ref = useRef<HTMLElement>(null);

  // Phone leans toward the cursor.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (!fine || reduced) return;
    const onMove = (e: PointerEvent) => {
      ry.set((e.clientX / window.innerWidth - 0.5) * 2 * MAX_TILT);
      rx.set((0.5 - e.clientY / window.innerHeight) * 2 * MAX_TILT);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduced, rx, ry]);

  // Scroll-out: the phone shrinks and the ghost flies on toward How it works.
  const { scrollYProgress: out } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const still = reduced;
  // On a phone a fixed sideways flight would carry the ghost off-screen, so it's limited by the screen's width.
  const [flyX, setFlyX] = useState(280);
  useEffect(() => {
    const measure = () => setFlyX(Math.min(280, window.innerWidth * 0.26));
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);
  const phoneScale = useTransform(out, [0, 1], still ? [1, 1] : [1, 0.74]);
  const phoneY = useTransform(out, [0, 1], still ? [0, 0] : [0, 120]);
  const phoneOpacity = useTransform(out, [0.55, 1], still ? [1, 1] : [1, 0.25]);
  const ghostX = useTransform(out, [0, 1], still ? [0, 0] : [0, -flyX * sign]);
  const ghostY = useTransform(out, [0, 1], still ? [0, 0] : [0, 620]);
  const ghostScale = useTransform(out, [0, 1], still ? [1, 1] : [1, 0.42]);
  const ghostRotate = useTransform(out, [0, 1], still ? [0, 0] : [0, -24 * sign]);
  const ghostOpacity = useTransform(out, [0.82, 1], still ? [1, 1] : [1, 0]);

  return (
    <section ref={ref} className="relative overflow-x-clip px-[var(--gutter)] pt-24 pb-10 lg:flex lg:min-h-svh lg:items-center lg:pt-24 lg:pb-16">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
        <div>
          <SplitText
            as="h1"
            stagger={0.06}
            delay={0.1}
            play={introDone}
            text={hero.headline}
            className="display text-[clamp(2.1rem,10.5vw,3.5rem)] font-extrabold lg:text-[clamp(2.5rem,6.2vw,5.25rem)]"
          />
          <Reveal sharp play={introDone} delay={0.2} className="mt-5 max-w-[34rem] lg:mt-6">
            <p className="text-base leading-relaxed text-body md:text-lg">{hero.sub}</p>
          </Reveal>
          <Reveal sharp play={introDone} delay={0.35} className="mt-6 lg:mt-8">
            <StoreButtons />
          </Reveal>
          <Reveal sharp play={introDone} delay={0.5} className="mt-4 lg:mt-6">
            <p className="flex items-center gap-2 text-sm text-body">
              <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-accent-ink" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              {hero.trust}
            </p>
          </Reveal>
        </div>

        <LoopGate className="relative flex justify-center pt-16 lg:pt-10">
          <GlowPulse className="top-[10%] left-1/2 size-[520px] -translate-x-1/2 md:size-[640px]" />
          <motion.div
            className="relative"
            style={{ scale: phoneScale, y: phoneY, opacity: phoneOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: introDone ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div style={{ rotateX, rotateY, transformPerspective: 1100 }}>
              <PhoneFrame label={a11y.phoneHome} size="lg">
                <HomeScreen />
              </PhoneFrame>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute -top-2 z-10 w-24 md:w-28 lg:-top-12"
            style={{ x: ghostX, y: ghostY, scale: ghostScale, rotate: ghostRotate, opacity: ghostOpacity }}
          >
            <div className="ghost-bob relative">
              {/* A blurred-looking gradient behind the ghost. A drop-shadow here would repaint with every hem frame. */}
              <span aria-hidden className="absolute -inset-[35%] rounded-full bg-[radial-gradient(circle,rgb(0_255_140/0.4),transparent_66%)]" />
              <Ghost follow blink hemWave title={a11y.mascot} className="relative w-full" />
            </div>
          </motion.div>
        </LoopGate>
      </div>
    </section>
  );
}
