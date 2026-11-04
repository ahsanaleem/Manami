import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { Cursor } from "@/components/global/Cursor";
import { Loader } from "@/components/global/Loader";
import { Providers } from "@/components/global/Providers";
import { ScrollProgress } from "@/components/global/ScrollProgress";
import { Starfield } from "@/components/global/Starfield";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { content } from "@/lib/content";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: content.meta.title,
  description: content.meta.description,
  applicationName: "Manami",
  alternates: { canonical: "/" },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    siteName: "Manami",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e24",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint, so a returning visitor never sees the loader or the wrong direction.
const bootScript = `try{var d=document.documentElement;var t=localStorage.getItem('manami-theme');if(t!=='light')t='dark';d.dataset.theme=t;if(sessionStorage.getItem('manami-intro'))d.dataset.introSeen='1';else d.classList.add('intro-lock');var l=localStorage.getItem('manami-lang');if(l==='ar'||l==='fr'){d.lang=l;d.dir=l==='ar'?'rtl':'ltr';d.dataset.langPending='1'}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${poppins.variable} ${arabic.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`#intro-loader{display:none!important}[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Providers>
          <SmoothScroll />
          <Starfield />
          <Loader />
          <ScrollProgress />
          <Cursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
