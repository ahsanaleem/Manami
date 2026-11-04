"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useT } from "@/components/global/Providers";
import { Magnetic } from "@/components/motion/Magnetic";
import { spring, storeLinks } from "@/lib/tokens";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  shimmer?: boolean;
  className?: string;
  /** Shows the logo in the custom cursor. */
  logoCursor?: boolean;
  onClick?: () => void;
};

const press = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: spring,
};

export function Button({ children, href, variant = "primary", shimmer, className = "", logoCursor, onClick }: ButtonProps) {
  const cls = `btn btn-${variant} ${shimmer ? "shimmer" : ""} ${className}`;
  const cursor = logoCursor ? { "data-cursor": "logo" } : {};
  if (href) {
    return (
      <motion.a href={href} className={cls} onClick={onClick} {...press} {...cursor}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" className={cls} onClick={onClick} {...press} {...cursor}>
      {children}
    </motion.button>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
      <path d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.27 3.14-2.53.99-1.45 1.4-2.86 1.42-2.93-.03-.01-2.72-1.04-2.74-4.12zM14.46 4.89c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.45z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
      <path d="M4.6 2.3c-.3.3-.5.8-.5 1.3v16.8c0 .5.2 1 .5 1.3l.1.1L14 12.2V12L4.7 2.2l-.1.1zM17.1 15.3 14 12.2V12l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.6 0 2.2l-3.7 2.1-.1-.1zM17.2 15.4 14 12.1l-9.4 9.6c.4.4 1 .4 1.7 0l10.9-6.3zM17.2 8.8 6.3 2.5c-.7-.4-1.3-.4-1.7.1l9.4 9.5 3.2-3.3z" />
    </svg>
  );
}

/** App Store and Google Play buttons. */
export function StoreButtons({ className = "" }: { className?: string }) {
  const { stores } = useT();
  const items = [
    { href: storeLinks.appStore, top: stores.appStoreTop, name: stores.appStore, icon: <AppleIcon />, variant: "primary" as const },
    { href: storeLinks.googlePlay, top: stores.googlePlayTop, name: stores.googlePlay, icon: <PlayIcon />, variant: "secondary" as const },
  ];
  return (
    // Phones: two equal buttons side by side, stacked only where they can't both fit.
    <div className={`grid gap-3 min-[375px]:grid-cols-2 sm:flex sm:flex-wrap ${className}`}>
      {items.map((s) => (
        <Magnetic key={s.name} className="block min-w-0 sm:inline-block">
          <Button
            href={s.href}
            variant={s.variant}
            logoCursor
            className="w-full !justify-center !gap-2 !px-2.5 min-[400px]:!gap-2.5 min-[400px]:!px-4 sm:w-auto sm:min-w-[184px] sm:!justify-start sm:!px-[22px]"
          >
            {s.icon}
            <span className="flex flex-col text-start leading-tight">
              <span className="text-xs font-medium opacity-80">{s.top}</span>
              <span dir="ltr" className="text-base font-semibold">
                {s.name}
              </span>
            </span>
          </Button>
        </Magnetic>
      ))}
    </div>
  );
}
