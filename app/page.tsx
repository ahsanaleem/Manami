import { Hero } from "@/components/sections/Hero";
import { LazyFooter, LazySections } from "@/components/sections/LazySections";
import { Nav } from "@/components/sections/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <LazySections />
      </main>
      <LazyFooter />
    </>
  );
}
