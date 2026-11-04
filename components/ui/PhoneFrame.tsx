import Image from "next/image";
import type { ReactNode } from "react";

type PhoneFrameProps = {
  /** Screen as a React component. Ignored when `screenshot` is set. */
  children?: ReactNode;
  /** Path to a real screenshot, such as "/screens/home.png" (280×600). */
  screenshot?: string;
  /** Description of what the phone shows. */
  label: string;
  /** Width in px at scale 1 is 300. Scale is responsive through CSS. */
  size?: "sm" | "md" | "lg" | "pinned";
  className?: string;
};

const sizes = {
  sm: "[--s:0.62] md:[--s:0.72]",
  md: "[--s:0.8] md:[--s:0.92]",
  lg: "[--s:0.88] md:[--s:1] xl:[--s:1.08]",
  // Has to fit inside one pinned screen, so it also responds to viewport height. See globals.css.
  pinned: "phone-pinned",
};

/**
 * iPhone mockup. Screens are drawn at a fixed 280×600 and scaled as one piece,
 * so a screen looks identical at every breakpoint.
 */
export function PhoneFrame({ children, screenshot, label, size = "lg", className = "" }: PhoneFrameProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative ${sizes[size]} ${className}`}
      style={{ width: "calc(300px * var(--s))", height: "calc(620px * var(--s))" }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 h-[620px] w-[300px] stay-dark phone-body origin-top-left rounded-[46px] border border-[#3a3a3a] bg-[#0a0a0a] p-[10px]"
        style={{ transform: "scale(var(--s))" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-black">
          {screenshot ? <Image src={screenshot} alt="" fill sizes="300px" className="object-cover" /> : children}
          <div className="absolute top-2.5 left-1/2 z-20 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/5" />
        </div>
      </div>
    </div>
  );
}
