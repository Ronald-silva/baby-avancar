import Link from "next/link";
import { BrandMark } from "@/shared/ui/brand-mark";
import { Button } from "@/shared/ui/button";
import { MobileMenu, type NavigationItem } from "@/shared/ui/mobile-menu";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/shared/config/site";

// Âncoras (#proposta, #atividades) apontam para seções ainda não implementadas nesta
// rodada (só Header + Hero) — a navegação já nasce com a arquitetura de informação
// aprovada; passam a rolar de fato assim que as seções correspondentes forem construídas.
const navigationItems: NavigationItem[] = [
  { href: "/", label: "Início" },
  { href: "/#proposta", label: "Proposta" },
  { href: "/#atividades", label: "Atividades" },
  { href: "/acesso", label: "Plataforma" },
];

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);

function ScheduleVisitButton({ className }: { className?: string }) {
  return (
    <Button asChild className={className}>
      <a href={scheduleVisitLink} rel="noopener noreferrer" target="_blank">
        Agendar uma visita
      </a>
    </Button>
  );
}

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand/10 bg-canvas/85 backdrop-blur-glass">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-5 py-2 sm:px-8">
        <Link aria-label="Colégio Baby Avançar — página inicial" className="tap-target inline-flex shrink-0 items-center rounded-xl" href="/">
          <BrandMark />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link className="tap-target inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-ink transition-[background-color,color] hover:bg-brand hover:text-brand-foreground xl:px-4 xl:text-base" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 lg:block">
          <ScheduleVisitButton />
        </div>

        <MobileMenu cta={<ScheduleVisitButton className="w-full justify-center" />} items={navigationItems} />
      </div>
    </header>
  );
}
