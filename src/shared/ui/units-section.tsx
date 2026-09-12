import { MapPin } from "lucide-react";
import { AdvancementPath } from "@/shared/ui/advancement-path";
import { Button } from "@/shared/ui/button";
import { buildMapsLink, buildWhatsAppLink, formatUnitAddress, UNITS, WHATSAPP_MESSAGES } from "@/shared/config/site";

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);

// Jóquei Clube não é "sede" — é a unidade da Educação Infantil. João XXIII é a
// unidade do Fundamental I. Nenhum dos dois é apresentado como principal (ver
// ROADMAP.md e AGENTS.md, Bloco 3, item 3).
const unitCards = [
  {
    ...UNITS.infantil,
    accentLabelClassName: "bg-brand/10 text-brand",
    mapsQuery: `${UNITS.infantil.street} - ${UNITS.infantil.neighborhood}, ${UNITS.infantil.addressLocality} - ${UNITS.infantil.addressRegion}`,
  },
  {
    ...UNITS.fundamental,
    accentLabelClassName: "bg-accent/15 text-ink",
    mapsQuery: `${UNITS.fundamental.street} - ${UNITS.fundamental.neighborhood}, ${UNITS.fundamental.addressLocality} - ${UNITS.fundamental.addressRegion}`,
  },
] as const;

export function UnitsSection() {
  return (
    <section aria-labelledby="unidades-title" className="bg-canvas py-16 sm:py-20 lg:py-28" id="unidades">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Unidades</p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl" id="unidades-title">
            {"Duas unidades, cada uma com seu segmento."}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {"A Educação Infantil acontece no Jóquei Clube; o Fundamental I, no João XXIII — endereços diferentes para etapas diferentes."}
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 sm:mt-16 md:grid-cols-2 md:gap-10">
          <AdvancementPath
            className="pointer-events-none absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-8 -translate-x-1/2 md:block"
            variant="desktop"
          />

          {unitCards.map((unit) => (
            <article
              className="relative rounded-4xl border border-border bg-surface p-6 shadow-soft transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-glass sm:p-8 lg:p-10"
              key={unit.name}
            >
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold uppercase tracking-wide ${unit.accentLabelClassName}`}>
                {unit.label}
              </span>
              <h3 className="mt-5 text-balance font-display text-2xl text-ink sm:text-3xl">{unit.name}</h3>
              <address className="mt-3 flex items-start gap-2 text-lg not-italic leading-relaxed text-muted">
                <MapPin aria-hidden="true" className="mt-1 shrink-0 text-muted" size={20} />
                <span>
                  {formatUnitAddress(unit)}
                  {"landmark" in unit ? ` — ${unit.landmark}` : ""}
                </span>
              </address>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild className="rounded-xl px-5 text-sm">
                  <a href={scheduleVisitLink} rel="noopener noreferrer" target="_blank">
                    Agendar uma visita
                  </a>
                </Button>
                <a
                  className="tap-target inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline"
                  href={buildMapsLink(unit.mapsQuery)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ver no mapa
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
