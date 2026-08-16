import WallHero from "@/components/WallHero";
import WaveBand from "@/components/WaveBand";
import TheLine from "@/components/TheLine";
import StoryWall from "@/components/StoryWall";
import NumbersGrid from "@/components/NumbersGrid";
import WorkCases from "@/components/WorkCases";
import ForDevelopers from "@/components/ForDevelopers";
import SiteFooter from "@/components/SiteFooter";
import SectionRail, { type RailSection } from "@/components/SectionRail";
import { FONT_SANS, PAL } from "@/lib/palette";

const SECTIONS: RailSection[] = [
  { id: "top", label: "Top", ground: "dark" },
  { id: "the-line", label: "The line", ground: "light" },
  { id: "story", label: "By accident", ground: "dark" },
  { id: "numbers", label: "Numbers", ground: "dark" },
  { id: "work", label: "The work", ground: "dark" },
  { id: "open-source", label: "For developers", ground: "dark" },
  { id: "contact", label: "Contact", ground: "light" },
];

export default function Home() {
  return (
    <main className="athos" style={{ fontFamily: FONT_SANS, background: PAL.bg, color: PAL.sand, overflow: "clip" }}>
      <a className="athos-skip" href="#the-line">
        Skip the wall
      </a>
      <SectionRail sections={SECTIONS} />
      <WallHero />
      <TheLine />
      <StoryWall />
      <NumbersGrid />
      <WorkCases />
      <ForDevelopers />
      <WaveBand phase={2.7} />
      <SiteFooter />
    </main>
  );
}
