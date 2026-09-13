import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { MotionReveal } from "@/shared/ui/motion-reveal";
import { buildWhatsAppLink, formatUnitAddress, UNITS, WHATSAPP_MESSAGES } from "@/shared/config/site";

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);
const talkOnWhatsAppLink = buildWhatsAppLink(WHATSAPP_MESSAGES.generalContact);

// Argumentos de marketing da campanha de Matrículas 2027 — só os que já são
// sustentados por conteúdo real do projeto (Differentiators/Activities/
// UNITS), nenhum número, selo ou nota inventados.
const highlights = [
  { title: "Ambiente acolhedor", description: "Turmas reduzidas e acompanhamento próximo, do jeito que já marca as duas unidades." },
  { title: "Metodologia própria", description: "Pensada para o Baby Avançar, não um pacote pronto aplicado do mesmo jeito em qualquer lugar." },
  { title: "Atividades além da sala", description: "Jiu-Jitsu, Bombeiro Mirim, Reforço Escolar e Ballet ampliando o que a criança vive na escola." },
  { title: "Continuidade real", description: "Da Educação Infantil ao Fundamental I sem precisar trocar de escola." },
] as const;

const units = [UNITS.joaoXXIII, UNITS.joqueiClube];

export function Enrollment2027Section() {
  return (
    <section aria-labelledby="matriculas-2027-title" className="bg-surface py-16 sm:py-20 lg:py-28" id="matriculas-2027">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <MotionReveal>
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Matrículas 2027</p>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl" id="matriculas-2027-title">
              {"Matrículas 2027 abertas."}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {"Um novo ano de descobertas, aprendizado e crescimento começa aqui."}
            </p>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {highlights.map((item) => (
                <li className="border-l-2 border-accent pl-4" key={item.title}>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
              {units.map((unit) => (
                <div key={unit.name}>
                  <p className="text-sm font-semibold text-ink">{unit.name}</p>
                  <p className="text-sm text-muted">{unit.label}</p>
                  <address className="mt-0.5 text-sm not-italic text-muted">{formatUnitAddress(unit)}</address>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Button asChild className="bg-accent text-accent-foreground hover:shadow-glass">
                <a href={scheduleVisitLink} rel="noopener noreferrer" target="_blank">
                  Agendar uma visita
                </a>
              </Button>
              <a
                className="tap-target inline-flex items-center font-semibold text-brand underline-offset-4 hover:underline"
                href={talkOnWhatsAppLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                Falar no WhatsApp
              </a>
            </div>

            <p className="mt-6 text-sm italic text-muted">{"Venha fazer parte dessa história."}</p>
          </MotionReveal>

          <MotionReveal className="relative mx-auto w-full max-w-md lg:max-w-none" delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-4xl shadow-soft">
              <Image
                alt="Aluna do Colégio Baby Avançar sorrindo com o uniforme da escola, lendo um livro infantil em sala de aula"
                className="object-cover object-[50%_18%]"
                fill
                sizes="(min-width: 1024px) 42vw, 80vw"
                src="/media/aluna.jpeg"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 w-2/5 overflow-hidden rounded-3xl border-4 border-surface shadow-glass sm:-right-8">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  alt="Aluna do Colégio Baby Avançar sorrindo durante atividade de leitura em sala de aula"
                  className="object-cover object-[50%_15%]"
                  fill
                  sizes="(min-width: 1024px) 17vw, 32vw"
                  src="/media/aluna1.jpeg"
                />
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
