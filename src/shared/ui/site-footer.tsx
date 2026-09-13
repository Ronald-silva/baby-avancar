import { Camera } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/shared/ui/brand-mark";
import { buildWhatsAppLink, formatUnitAddress, SITE, UNITS, WHATSAPP_MESSAGES } from "@/shared/config/site";
import { WhatsAppIcon } from "@/shared/ui/whatsapp-icon";

const talkOnWhatsAppLink = buildWhatsAppLink(WHATSAPP_MESSAGES.generalContact);

// Navegação só aparece a partir de `sm`: no mobile ela é pura repetição do
// menu hambúrguer do Header (as mesmas 3 âncoras a 1 tap de distância) —
// "não colocar navegação extensa só para preencher espaço" (ver auditoria
// corretiva). Segmentos já cobre o que antes era Proposta/Infantil/
// Fundamental/Unidades como seção própria.
const footerNavigation = [
  { href: "/", label: "Início" },
  { href: "/#segmentos", label: "Segmentos" },
  { href: "/acesso", label: "Plataforma" },
] as const;

const socialLinkClassName =
  "tap-target inline-flex items-center gap-2 rounded-full border border-inverse/15 bg-inverse/5 px-4 py-2 text-sm font-semibold text-inverse/90 transition-colors hover:border-inverse/30 hover:bg-inverse/10 hover:text-inverse";

const units = [UNITS.joqueiClube, UNITS.joaoXXIII];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-12 text-inverse sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandMark wordmarkClassName="text-inverse" />
            <p className="mt-5 max-w-xs text-sm italic text-inverse/70">{`“${SITE.tagline}”`}</p>
            {/* WhatsApp/Instagram como ações reais (ícone + label + pill),
                não texto solto — precisam ficar evidentemente clicáveis. */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a aria-label="Falar no WhatsApp com o Colégio Baby Avançar" className={socialLinkClassName} href={talkOnWhatsAppLink} rel="noopener noreferrer" target="_blank">
                <WhatsAppIcon size={17} />
                WhatsApp
              </a>
              <a aria-label="Instagram do Colégio Baby Avançar" className={socialLinkClassName} href={SITE.instagramUrl} rel="noopener noreferrer" target="_blank">
                <Camera aria-hidden="true" size={17} />
                Instagram
              </a>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé" className="hidden sm:block">
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
                  <address className="text-sm not-italic text-inverse/60">{formatUnitAddress(unit)}</address>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-inverse/10 pt-6 text-center text-sm text-inverse/50 sm:mt-12">
          <p>{`© ${year} ${SITE.legalName}. Todos os direitos reservados.`}</p>
          {/* Crédito do desenvolvedor: continua discreto por ser `text-xs` (menor
              que o copyright acima), mas herda o mesmo `text-inverse/50` do
              container em vez do `/35` que tinha antes — `/35` media 3.18:1 de
              contraste contra o fundo `bg-ink` (abaixo do mínimo 4.5:1 da WCAG
              AA para texto normal); `/50` mede ~5.1:1. O link usa sublinhado
              permanente (não só cor) para não depender de diferença de cor com
              o texto ao redor — mesma falha de contraste que a auditoria
              apontou entre link e texto. */}
          <p className="mt-2 text-xs">
            {"Desenvolvido por "}
            <a
              className="underline underline-offset-4 hover:text-inverse/80"
              href="https://www.ronaldigital.tech/"
              rel="noopener noreferrer"
              target="_blank"
            >
              RonalDigital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
