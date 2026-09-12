import { ActivitiesSection } from "@/shared/ui/activities-section";
import { DifferentiatorsSection } from "@/shared/ui/differentiators-section";
import { EarlyChildhoodSection } from "@/shared/ui/early-childhood-section";
import { ElementarySection } from "@/shared/ui/elementary-section";
import { FinalCtaSection } from "@/shared/ui/final-cta-section";
import { GallerySection } from "@/shared/ui/gallery-section";
import { Hero } from "@/shared/ui/hero";
import { MarketingHeader } from "@/shared/ui/marketing-header";
import { PedagogicalIntro } from "@/shared/ui/pedagogical-intro";
import { SiteFooter } from "@/shared/ui/site-footer";
import { TestimonialsSection } from "@/shared/ui/testimonials-section";
import { UnitsSection } from "@/shared/ui/units-section";

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
        <TestimonialsSection />
        <GallerySection />
        <UnitsSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
