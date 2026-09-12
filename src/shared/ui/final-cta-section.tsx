import { MotionReveal } from "@/shared/ui/motion-reveal";
import { Button } from "@/shared/ui/button";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/shared/config/site";

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);
const talkOnWhatsAppLink = buildWhatsAppLink(WHATSAPP_MESSAGES.generalContact);

export function FinalCtaSection() {
  return (
    <section aria-labelledby="cta-final-title" className="bg-secondary py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <MotionReveal>
          <h2 className="font-display text-3xl leading-tight text-inverse sm:text-4xl" id="cta-final-title">
            {"Venha conhecer de perto o dia a dia da escola."}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-inverse/85">
            {"Nada substitui ver com os próprios olhos como cada criança é acompanhada. Agende uma visita ou fale com a gente agora mesmo pelo WhatsApp."}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <Button asChild className="bg-accent text-accent-foreground hover:shadow-glass">
              <a href={scheduleVisitLink} rel="noopener noreferrer" target="_blank">
                Agendar uma visita
              </a>
            </Button>
            <a
              className="tap-target inline-flex items-center font-semibold text-inverse underline-offset-4 hover:underline"
              href={talkOnWhatsAppLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Falar no WhatsApp
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
