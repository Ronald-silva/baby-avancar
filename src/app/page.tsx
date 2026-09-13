import type { Metadata } from "next";
import { ActivitiesSection } from "@/shared/ui/activities-section";
import { DifferentiatorsSection } from "@/shared/ui/differentiators-section";
import { Enrollment2027Section } from "@/shared/ui/enrollment-2027-section";
import { FinalCtaSection } from "@/shared/ui/final-cta-section";
import { Hero } from "@/shared/ui/hero";
import { MarketingHeader } from "@/shared/ui/marketing-header";
import { SegmentsSection } from "@/shared/ui/segments-section";
import { SiteFooter } from "@/shared/ui/site-footer";
import { SocialProofSection } from "@/shared/ui/social-proof-section";
import { StructuredData } from "@/shared/ui/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Redesign estratégico: Home reestruturada de 11 seções de conteúdo pra 5,
// eliminando repetição (Proposta + Infantil + Fundamental + Unidades diziam
// a mesma coisa 4 vezes; Depoimentos + Galeria contavam a mesma história de
// dois jeitos). Ver relatório do redesign para o raciocínio completo.
export default function HomePage() {
  return (
    <>
      <StructuredData />
      <MarketingHeader />
      <main id="conteudo-principal" tabIndex={-1}>
        <Hero />
        <Enrollment2027Section />
        <DifferentiatorsSection />
        <SegmentsSection />
        <ActivitiesSection />
        <SocialProofSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
