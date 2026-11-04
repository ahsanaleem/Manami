"use client";

import { motion } from "motion/react";
import { useId, type ReactNode } from "react";
import { spring } from "@/lib/tokens";

type ToggleProps<T extends string> = {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
};

/** Segmented control with a sliding pill. */
export function Toggle<T extends string>({ options, value, onChange, label, className = "" }: ToggleProps<T>) {
  const id = useId();
  return (
    <div role="group" aria-label={label} className={`glass inline-flex rounded-full p-1 ${className}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`relative flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
              active ? "text-on-accent" : "text-body hover:text-text"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`pill-${id}`}
                className="absolute inset-0 rounded-full bg-accent"
                transition={spring}
              />
            )}
            <span className="relative flex items-center gap-2">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
