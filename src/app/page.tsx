import type { Metadata } from "next";
import { ActivitiesSection } from "@/shared/ui/activities-section";
import { DifferentiatorsSection } from "@/shared/ui/differentiators-section";
import { EarlyChildhoodSection } from "@/shared/ui/early-childhood-section";
import { ElementarySection } from "@/shared/ui/elementary-section";
import { FaqSection } from "@/shared/ui/faq-section";
import { FinalCtaSection } from "@/shared/ui/final-cta-section";
import { GallerySection } from "@/shared/ui/gallery-section";
import { Hero } from "@/shared/ui/hero";
import { MarketingHeader } from "@/shared/ui/marketing-header";
import { PedagogicalIntro } from "@/shared/ui/pedagogical-intro";
import { SiteFooter } from "@/shared/ui/site-footer";
import { StructuredData } from "@/shared/ui/structured-data";
import { TestimonialsSection } from "@/shared/ui/testimonials-section";
import { UnitsSection } from "@/shared/ui/units-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <MarketingHeader />
      <main id="conteudo-principal" tabIndex={-1}>
        <Hero />
        <PedagogicalIntro />
        <EarlyChildhoodSection />
        <ElementarySection />
        <ActivitiesSection />
        <DifferentiatorsSection />
        <TestimonialsSection />
        <GallerySection />
        <UnitsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
