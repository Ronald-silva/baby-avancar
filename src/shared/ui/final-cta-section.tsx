import { MotionReveal } from "@/shared/ui/motion-reveal";
import { Button } from "@/shared/ui/button";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/shared/config/site";

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);
const talkOnWhatsAppLink = buildWhatsAppLink(WHATSAPP_MESSAGES.generalContact);

// Redesign da Home: a seção de FAQ (5 perguntas) foi cortada como bloco
// próprio — 3 das 5 perguntas (segmentos, endereço de cada unidade) ficaram
// redundantes com a nova seção Segmentos. As 2 perguntas com informação que
// não aparece em nenhum outro lugar da página (atividades extras, como
// agendar) continuam aqui como texto compacto — o FAQPage JSON-LD é gerado
// deste mesmo array, então não existe divergência entre o dado estruturado
// e o texto visível.
const faqs = [
  {
    question: "A escola oferece atividades extras?",
    answer: "Sim: Jiu-Jitsu, Bombeiro Mirim, Reforço Escolar e Ballet, além das atividades regulares de cada segmento.",
  },
  {
    question: "Como agendar uma visita à escola?",
    answer: "Pelo WhatsApp do colégio — o botão “Agendar uma visita” abaixo leva direto à conversa.",
  },
] as const;

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function FinalCtaSection() {
  const faqJsonLd = JSON.stringify(buildFaqJsonLd()).replace(/</g, "\\u003c");

  return (
    <section aria-labelledby="cta-final-title" className="bg-secondary py-16 sm:py-20 lg:py-24">
      <script dangerouslySetInnerHTML={{ __html: faqJsonLd }} type="application/ld+json" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <MotionReveal>
          <h2 className="text-balance font-display text-3xl leading-tight text-inverse sm:text-4xl" id="cta-final-title">
            {"Venha conhecer de perto o dia a dia da escola."}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-inverse/85">
            {"Nada substitui ver com os próprios olhos como cada criança é acompanhada."}
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

          <div className="mx-auto mt-12 grid max-w-xl gap-6 border-t border-inverse/15 pt-8 text-left sm:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <p className="text-sm font-semibold text-inverse">{faq.question}</p>
                <p className="mt-1 text-sm text-inverse/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
