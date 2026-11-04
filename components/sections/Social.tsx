"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLang, useT } from "@/components/global/Providers";
import { GlowPulse } from "@/components/motion/GlowPulse";
import { useReduced } from "@/components/motion/hooks";
import { LoopGate } from "@/components/motion/LoopGate";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { StatusBar } from "@/components/ui/screens";
import { colors, friends } from "@/lib/tokens";

const MARQUEE_TRAVEL = 1300; // px the reel row moves across the section's trip through the viewport
const ORBIT_TIME = "46s";
const REEL_ACCENTS = [colors.summary, colors.symbols, colors.reflection, colors.visualizeTo, colors.emotional, colors.accent];

type Reel = { title: string; emoji: string; quote: string; by: string };

function ReelCard({ reel, accent, duplicate }: { reel: Reel; accent: string; duplicate?: boolean }) {
  return (
    <article
      aria-hidden={duplicate}
      className="stay-dark relative flex h-[320px] w-[240px] shrink-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/12 p-5 md:h-[360px] md:w-[270px]"
      style={{ background: `linear-gradient(170deg, color-mix(in srgb, ${accent} 42%, #000), #0b0b0b 78%)` }}
    >
      <span className="text-5xl">{reel.emoji}</span>
      <h3 className="mt-auto text-lg leading-tight font-bold">{reel.title}</h3>
      <p className="mt-2 text-sm leading-snug text-white/85">“{reel.quote}”</p>
      <p className="mt-3 text-xs text-white/70">{reel.by}</p>
    </article>
  );
}

function ReelScreen({ reel }: { reel: Reel }) {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#2a1650] via-[#120a22] to-black">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="text-7xl">{reel.emoji}</span>
        <p className="mt-6 text-2xl leading-tight font-bold">{reel.title}</p>
        <p className="mt-3 text-sm leading-snug text-white/80">“{reel.quote}”</p>
      </div>
      <div className="flex items-center justify-center gap-5 pb-10 text-xl">
        <span>❤️</span>
        <span>💬</span>
        <span>🌙</span>
      </div>
    </div>
  );
}

export function Social() {
  const { social, a11y, screen } = useT();
  const { sign } = useLang();
  const reduced = useReduced();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -MARQUEE_TRAVEL * sign]);

  return (
    <section ref={ref} className="relative overflow-x-clip py-[clamp(56px,12vw,160px)]">
      <div className="container-page px-[var(--gutter)] text-center xl:px-0">
        <SplitText text={social.title} by="char" stagger={0.03} className="display h2 mx-auto" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-[34rem] text-body md:text-lg">{social.sub}</p>
        </Reveal>
      </div>

      {/* Friends orbit a central phone */}
      <LoopGate className="relative mx-auto mt-6 flex h-[460px] max-w-full items-center justify-center [--r:min(146px,37vw)] sm:[--r:220px] md:mt-14 md:h-[660px] md:[--r:290px]">
        <GlowPulse className="top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 md:size-[760px]" />
        {/* Above the orbit, so friends pass behind the phone rather than over its text. */}
        <PhoneFrame label={a11y.phoneSocial} size="sm" className="z-10">
          <ReelScreen reel={social.reels[0]} />
        </PhoneFrame>

        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 size-[calc(var(--r)*2)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line"
        />
        <div aria-hidden className="orbit absolute top-1/2 left-1/2 size-0" style={{ ["--orbit-time" as string]: ORBIT_TIME }}>
          {friends.map((f, i) => (
            <span
              key={f.name}
              className="absolute top-0 left-0 size-0"
              style={{ transform: `rotate(${i * 72}deg) translateX(var(--r)) rotate(${-i * 72}deg)` }}
            >
              <span className="orbit-counter absolute -top-8 -left-8 flex w-16 flex-col items-center gap-2" style={{ ["--orbit-time" as string]: ORBIT_TIME }}>
                <span
                  className="grid size-12 place-items-center rounded-full bg-surface-2 text-2xl md:size-14"
                  style={{ boxShadow: `0 0 0 2px var(--color-bg), 0 0 0 4px ${f.ring}, 0 0 24px ${f.ring}66` }}
                >
                  {f.emoji}
                </span>
                <span className="text-xs font-medium text-text/85">{screen.friendNames[f.name]}</span>
              </span>
            </span>
          ))}
        </div>

        {/* Reactions drift up and fade */}
        {social.bubbles.map((b, i) => (
          <span
            key={i}
            aria-hidden
            className="float-up glass absolute z-20 grid size-10 place-items-center rounded-full text-lg opacity-0"
            style={{
              // Kept beside the phone (half its width is 93px on a phone), so reactions never cover its text.
              left: `calc(50% - 20px + ${(i % 2 ? 1 : -1) * (112 + (i % 3) * 14)}px)`,
              bottom: `${16 + (i % 3) * 8}%`,
              ["--float-delay" as string]: `${i * 1.1}s`,
              ["--float-time" as string]: `${5.5 + (i % 3)}s`,
            }}
          >
            {b}
          </span>
        ))}
      </LoopGate>

      {/* Scroll-driven marquee. With reduced motion it's a row you can swipe. */}
      <div className={`mt-8 md:mt-14 ${reduced ? "overflow-x-auto" : ""}`}>
        <motion.div className="flex w-max gap-4 px-[var(--gutter)]" style={{ x }}>
          {[0, 1, 2].flatMap((round) =>
            social.reels.map((reel, i) => (
              <ReelCard key={`${round}-${reel.title}`} reel={reel} accent={REEL_ACCENTS[i % REEL_ACCENTS.length]} duplicate={round > 0} />
            )),
          )}
        </motion.div>
      </div>
    </section>
  );
}
