import { MotionReveal } from "@/shared/ui/motion-reveal";

// Perguntas reais que uma família faria antes de matricular — respostas
// derivadas apenas de informação já confirmada em outras seções da Home
// (segmentos, endereços, atividades, canal de agendamento). Nenhuma política
// de matrícula, documentação, valor ou horário foi inventada (ver Bloco 4).
const faqs = [
  {
    question: "Quais segmentos de ensino o Colégio Baby Avançar oferece?",
    answer: "O Colégio Baby Avançar oferece Educação Infantil e Ensino Fundamental I.",
  },
  {
    question: "Onde fica a unidade de Educação Infantil?",
    answer: "Na unidade Jóquei Clube, na Rua Silveira Filho, 375, em Fortaleza (CE).",
  },
  {
    question: "Onde fica a unidade do Fundamental I?",
    answer: "Na unidade João XXIII, na Rua Perdigão de Oliveira, 1241, em Fortaleza (CE), bem próximo à Praça do João XXIII.",
  },
  {
    question: "A escola oferece atividades extras?",
    answer: "Sim: Jiu-Jitsu, Bombeiro Mirim & Primeiros Socorros e Reforço Escolar, além das atividades regulares de cada segmento.",
  },
  {
    question: "Como agendar uma visita à escola?",
    answer: "Pelo WhatsApp do colégio — o botão “Agendar uma visita” em qualquer parte do site leva direto à conversa.",
  },
] as const;

// FAQPage gerado a partir do MESMO array `faqs` acima — não há como o JSON-LD
// divergir do texto visível na página (ver AGENTS.md, Bloco 4, item E).
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

export function FaqSection() {
  const faqJsonLd = JSON.stringify(buildFaqJsonLd()).replace(/</g, "\\u003c");

  return (
    <section aria-labelledby="faq-title" className="bg-surface py-16 sm:py-20 lg:py-28" id="faq">
      <script dangerouslySetInnerHTML={{ __html: faqJsonLd }} type="application/ld+json" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Perguntas frequentes</p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl" id="faq-title">
            {"Antes de agendar sua visita."}
          </h2>
        </MotionReveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:mt-14 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <MotionReveal delay={0.05 * index} key={faq.question}>
              <article className="border-t border-border pt-6">
                <h3 className="text-balance font-display text-xl text-ink sm:text-2xl">{faq.question}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{faq.answer}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
