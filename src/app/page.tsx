import { ActivitiesSection } from "@/shared/ui/activities-section";
import { DifferentiatorsSection } from "@/shared/ui/differentiators-section";
import { EarlyChildhoodSection } from "@/shared/ui/early-childhood-section";
import { ElementarySection } from "@/shared/ui/elementary-section";
import { Hero } from "@/shared/ui/hero";
import { MarketingHeader } from "@/shared/ui/marketing-header";
import { PedagogicalIntro } from "@/shared/ui/pedagogical-intro";

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main>
        <Hero />
        <PedagogicalIntro />
        <EarlyChildhoodSection />
        <ElementarySection />
        <ActivitiesSection />
        <DifferentiatorsSection />
      </main>
    </>
  );
}
