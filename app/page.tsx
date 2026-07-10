import { Nav } from "@/components/sections/Nav";
import { ScrollHero } from "@/components/ui/ScrollHero";
import { EmergeFromLight } from "@/components/ui/EmergeFromLight";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { Problem } from "@/components/sections/Problem";
import { Work } from "@/components/sections/Work";
import { WaysToWork } from "@/components/sections/WaysToWork";
import { AIPart } from "@/components/sections/AIPart";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <ScrollHero />
        <EmergeFromLight>
          <WhatWeBuild />
        </EmergeFromLight>
        <Problem />
        <Work />
        <WaysToWork />
        <AIPart />
        <Process />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
