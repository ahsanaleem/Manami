"use client";

import dynamic from "next/dynamic";
import { useT } from "@/components/global/Providers";
import { Reveal } from "@/components/motion/Reveal";

// Particle sampling is the only heavy work here, so it loads with the section's own chunk.
const ShieldParticles = dynamic(() => import("./ShieldParticles").then((m) => m.ShieldParticles), {
  ssr: false,
  loading: () => <div className="aspect-[320/360] w-[min(56vw,340px)]" />,
});

export function Privacy() {
  const { privacy } = useT();
  return (
    <section id="privacy" className="section overflow-x-clip">
      <div className="container-page grid items-center gap-8 md:grid-cols-2 md:gap-20">
        <div className="flex justify-center">
          <ShieldParticles className="w-[min(56vw,340px)]" />
        </div>
        <div>
          <Reveal>
            <h2 className="display h2 max-w-[18ch]">{privacy.title}</h2>
          </Reveal>
          <ul className="mt-6 flex flex-col gap-5 md:mt-10 md:gap-7">
            {privacy.points.map((point, i) => (
              // Slower than the rest of the page: this section should feel still.
              <li key={point.title}>
                <Reveal delay={0.25 + i * 0.4} className="border-s-2 border-accent-ink/50 ps-5">
                  <h3 className="text-lg font-semibold">{point.title}</h3>
                  <p className="mt-1 leading-relaxed text-body">{point.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
