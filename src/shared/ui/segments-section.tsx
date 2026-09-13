import { MapPin } from "lucide-react";
import Image from "next/image";
import { AdvancementPath } from "@/shared/ui/advancement-path";
import { Button } from "@/shared/ui/button";
import { MotionReveal } from "@/shared/ui/motion-reveal";
import { buildMapsLink, buildWhatsAppLink, formatUnitAddress, UNITS, WHATSAPP_MESSAGES } from "@/shared/config/site";

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);

// Redesign da Home: funde num só bloco o que antes eram 4 seções (Proposta
// Pedagógica + Infantil + Fundamental + Unidades) repetindo a mesma
// informação (endereço, segmento) até 3x antes do meio da página. Mantém o
// contraste claro/escuro que já distinguia as duas etapas — agora lado a
// lado, não uma embaixo da outra — e o CTA/endereço de cada unidade não
// precisa mais de uma seção própria.
const segments = [
  {
    ...UNITS.infantil,
    pitch: "Acolher vem antes de ensinar: cada criança segura para explorar, brincar e descobrir no seu próprio ritmo.",
    image: {
      src: "/media/home/infantil-descoberta.jpg",
      alt: "Criança pequena concentrada encaixando peças de madeira coloridas em brinquedo pedagógico na Educação Infantil",
    },
    tone: "light",
    mapsQuery: `${UNITS.infantil.street} - ${UNITS.infantil.neighborhood}, ${UNITS.infantil.addressLocality} - ${UNITS.infantil.addressRegion}`,
  },
  {
    ...UNITS.fundamental,
    pitch: "Mais registro e mais autonomia, com o mesmo acompanhamento próximo que marca a escola desde a Infantil.",
    image: {
      src: "/media/home/fundamental-registro.jpg",
      alt: "Criança do Fundamental I registrando atividade escrita em caderno do Colégio Baby Avançar",
    },
    tone: "dark",
    mapsQuery: `${UNITS.fundamental.street} - ${UNITS.fundamental.neighborhood}, ${UNITS.fundamental.addressLocality} - ${UNITS.fundamental.addressRegion}`,
  },
] as const;

export function SegmentsSection() {
  return (
    <section aria-labelledby="segmentos-title" className="bg-surface py-16 sm:py-20 lg:py-28" id="segmentos">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Segmentos</p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl" id="segmentos-title">
            {"Duas etapas, um só jeito de acompanhar."}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {"Turmas reduzidas e acompanhamento psicopedagógico em cada fase, para que cada criança aprenda no seu próprio ritmo."}
          </p>
        </MotionReveal>

        <div className="relative mt-14 grid gap-6 sm:mt-16 md:grid-cols-2">
          <AdvancementPath
            className="pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-8 -translate-x-1/2 md:block"
            variant="desktop"
          />

          {segments.map((segment) => {
            const isDark = segment.tone === "dark";
            return (
              <MotionReveal delay={isDark ? 0.08 : 0} key={segment.name}>
                <article
                  className={`flex h-full flex-col overflow-hidden rounded-4xl transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-glass ${isDark ? "bg-secondary text-inverse" : "bg-surface-muted text-ink"}`}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image alt={segment.image.alt} className="object-cover" fill sizes="(min-width: 768px) 46vw, 92vw" src={segment.image.src} />
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <p className={`text-sm font-bold uppercase tracking-wide ${isDark ? "text-accent" : "text-brand"}`}>{segment.label}</p>
                    <h3 className="mt-3 text-balance font-display text-2xl">{segment.name}</h3>
                    <p className={`mt-3 leading-relaxed ${isDark ? "text-inverse/85" : "text-muted"}`}>{segment.pitch}</p>
                    <address className={`mt-4 flex items-start gap-2 text-sm not-italic leading-relaxed ${isDark ? "text-inverse/70" : "text-muted"}`}>
                      <MapPin aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
                      <span>
                        {formatUnitAddress(segment)}
                        {"landmark" in segment ? ` — ${segment.landmark}` : ""}
                      </span>
                    </address>

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Button
                        asChild
                        className={isDark ? "bg-accent text-accent-foreground hover:shadow-glass" : "rounded-full"}
                      >
                        <a href={scheduleVisitLink} rel="noopener noreferrer" target="_blank">
                          Agendar uma visita
                        </a>
                      </Button>
                      <a
                        className={`tap-target inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline ${isDark ? "text-inverse" : "text-brand"}`}
                        href={buildMapsLink(segment.mapsQuery)}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Ver no mapa
                      </a>
                    </div>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
