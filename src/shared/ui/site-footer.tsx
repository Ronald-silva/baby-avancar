import Link from "next/link";
import { BrandMark } from "@/shared/ui/brand-mark";
import { buildWhatsAppLink, SITE, UNITS, WHATSAPP_MESSAGES } from "@/shared/config/site";

const talkOnWhatsAppLink = buildWhatsAppLink(WHATSAPP_MESSAGES.generalContact);

const footerNavigation = [
  { href: "/", label: "Início" },
  { href: "/#proposta", label: "Proposta" },
  { href: "/#galeria", label: "Vida na Baby Avançar" },
  { href: "/#unidades", label: "Unidades" },
  { href: "/acesso", label: "Plataforma" },
] as const;

const units = [UNITS.infantil, UNITS.fundamental];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-14 text-inverse sm:py-16" role="contentinfo">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <BrandMark wordmarkClassName="text-inverse" />
            <p className="mt-5 max-w-xs text-sm italic text-inverse/70">{`"${SITE.tagline}"`}</p>
            <div className="mt-6 flex items-center gap-4">
              <a
                aria-label="WhatsApp do Colégio Baby Avançar"
                className="tap-target inline-flex items-center gap-2 text-sm font-semibold text-inverse/85 hover:text-inverse"
                href={talkOnWhatsAppLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
              <a
                aria-label="Instagram do Colégio Baby Avançar"
                className="tap-target inline-flex items-center gap-2 text-sm font-semibold text-inverse/85 hover:text-inverse"
                href={SITE.instagramUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-sm font-bold uppercase tracking-wide text-inverse/50">Navegação</p>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link className="tap-target inline-flex items-center text-sm font-semibold text-inverse/85 hover:text-inverse" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-inverse/50">Unidades</p>
            <ul className="mt-4 space-y-4">
              {units.map((unit) => (
                <li key={unit.name}>
                  <p className="text-sm font-semibold text-inverse/85">{unit.label}</p>
                  <p className="text-sm text-inverse/60">
                    {unit.street} – {unit.neighborhood}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-inverse/10 pt-6 text-sm text-inverse/50">
          <p>{`© ${year} ${SITE.legalName}. Todos os direitos reservados.`}</p>
        </div>
      </div>
    </footer>
  );
}
