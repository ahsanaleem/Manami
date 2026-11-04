"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useT } from "@/components/global/Providers";
import { GlowPulse } from "@/components/motion/GlowPulse";
import { LoopGate } from "@/components/motion/LoopGate";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { durations, easeOutExpo, spring, storeLinks } from "@/lib/tokens";

// Edit prices here. The yearly total shown under the price lives in lib/content.ts (billedYearly).
const PRICES = { monthly: "9.99", yearly: "6.99" } as const;
type Billing = keyof typeof PRICES;

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

/** Vertical number roll, one column per digit. */
function RollingPrice({ value }: { value: string }) {
  return (
    <span dir="ltr" className="inline-flex items-baseline leading-none">
      <span className="sr-only">${value}</span>
      <span aria-hidden className="me-0.5 self-start pt-1 text-2xl font-semibold">
        $
      </span>
      <span aria-hidden className="inline-flex text-6xl font-extrabold tabular-nums">
        {[...value].map((ch, i) =>
          ch === "." ? (
            <span key={i}>.</span>
          ) : (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden">
              <motion.span
                className="flex flex-col"
                initial={false}
                animate={{ y: `${-Number(ch) * 10}%` }}
                transition={{ ...spring, delay: i * 0.04 }}
              >
                {DIGITS.map((d) => (
                  <span key={d} className="block h-[1em] leading-none">
                    {d}
                  </span>
                ))}
              </motion.span>
            </span>
          ),
        )}
      </span>
    </span>
  );
}

function DrawCheck({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0" fill="none" aria-hidden>
      <motion.path
        d="m4 10.500 4 4 8-9"
        stroke="var(--color-accent-ink)"
        strokeWidth="2.500"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.4, delay, ease: easeOutExpo }}
      />
    </svg>
  );
}

function FreeFeature({ label, included, delay }: { label: string; included: boolean; delay: number }) {
  if (included) {
    return (
      <li className="flex gap-3 text-sm text-text">
        <DrawCheck delay={delay} />
        {label}
      </li>
    );
  }
  return (
    <li className="flex gap-3 text-sm text-body">
      <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-body" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M6 6l8 8M14 6l-8 8" />
      </svg>
      <span className="relative">
        <s className="no-underline">{label}</s>
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-px origin-[left_center] bg-body rtl:origin-[right_center]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: durations.ui + 0.1, delay, ease: easeOutExpo }}
        />
      </span>
    </li>
  );
}

export function Pricing() {
  const { pricing } = useT();
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <section id="pricing" className="section overflow-x-clip">
      <div className="container-page flex flex-col items-center">
        <SplitText text={pricing.title} className="display h2 max-w-[22ch] text-center" />

        <Reveal delay={0.1} className="mt-6 md:mt-10">
          <Toggle
            label={`${pricing.monthly} / ${pricing.yearly}`}
            value={billing}
            onChange={setBilling}
            options={[
              { value: "monthly", label: pricing.monthly },
              {
                value: "yearly",
                label: (
                  <>
                    {pricing.yearly}
                    <span className="inline-block w-11">
                      <AnimatePresence>
                        {billing === "yearly" && (
                          <motion.span
                            className="inline-block"
                            initial={{ scale: 0, rotate: -14 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ ...spring, stiffness: 420, damping: 16 }}
                          >
                            <Badge dir="ltr" className="!bg-black !px-1.5 !text-accent">{pricing.discount}</Badge>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </>
                ),
              },
            ]}
          />
        </Reveal>

        <div className="mt-8 grid w-full max-w-[920px] items-stretch gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          {/* Free. On phones it follows Premium, which would otherwise sit a full screen further down. */}
          <Reveal className="order-2 h-full md:order-none">
            <div className="glass flex h-full flex-col rounded-[var(--radius-card-lg)] p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-text/25 md:p-7">
              <h3 className="text-xl font-semibold">{pricing.free.name}</h3>
              <div className="mt-5 flex items-baseline gap-2">
                <RollingPrice value="0" />
                <span className="text-body">{pricing.forever}</span>
              </div>
              {/* Lines the feature lists up with Premium's billing note when the cards sit side by side. */}
              <p className="mt-2 hidden h-5 text-sm text-body md:block" aria-hidden />
              <ul className="mt-5 flex flex-1 flex-col gap-3 md:mt-6">
                {pricing.free.features.map((f, i) => (
                  <FreeFeature key={f.label} label={f.label} included={f.included} delay={0.15 + i * 0.1} />
                ))}
              </ul>
              <Button href={storeLinks.appStore} variant="secondary" ghostCursor className="mt-8 w-full">
                {pricing.free.cta}
              </Button>
            </div>
          </Reveal>

          {/* Premium */}
          <Reveal delay={0.12} className="relative order-1 h-full md:order-none">
            <LoopGate className="relative h-full">
              <GlowPulse className="-inset-16" />
              <div className="relative h-full overflow-hidden rounded-[var(--radius-card-lg)] bg-border p-[1.5px] transition-transform duration-300 hover:-translate-y-1">
                <div aria-hidden className="conic-spin absolute -inset-[70%]" />
                <div className="relative flex h-full flex-col rounded-[calc(var(--radius-card-lg)-1.5px)] bg-premium p-5 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{pricing.premium.name}</h3>
                    <Badge>{pricing.popular}</Badge>
                  </div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <RollingPrice value={PRICES[billing]} />
                    <span className="text-body">{pricing.perMonth}</span>
                  </div>
                  <div className="relative mt-2 h-5 text-sm text-body">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={billing}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: durations.micro }}
                      >
                        {billing === "yearly" ? pricing.billedYearly : pricing.billedMonthly}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {pricing.premium.features.map((f, i) => (
                      <li key={f.label} className="flex gap-3 text-sm text-text">
                        <DrawCheck delay={0.2 + i * 0.09} />
                        {f.label}
                      </li>
                    ))}
                  </ul>
                  <Magnetic className="mt-8 block">
                    <Button href={storeLinks.appStore} shimmer ghostCursor className="w-full">
                      {pricing.premium.cta}
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </LoopGate>
          </Reveal>
        </div>

        <p className="mt-8 text-sm text-body">{pricing.note}</p>
      </div>
    </section>
  );
}
