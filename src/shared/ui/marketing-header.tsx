import Link from "next/link";
import { BrandMark } from "@/shared/ui/brand-mark";
import { Button } from "@/shared/ui/button";
import { DesktopNav } from "@/shared/ui/desktop-nav";
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

// Nav completa e CTA aparecem a partir de `lg` (1024px); abaixo disso, o
// hambúrguer do MobileMenu assume (classe `lg:hidden` em mobile-menu.tsx).
// As duas classes precisam usar sempre o MESMO breakpoint — senão nav
// completa e hambúrguer aparecem juntos (ou nenhum dos dois) numa faixa
// de largura intermediária. NÃO subir para xl: o layout abaixo já foi
// dimensionado (gap/padding/tamanho de fonte) para caber em 1024px.
export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-canvas/90 backdrop-blur-glass">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link aria-label="Colégio Baby Avançar — página inicial" className="tap-target inline-flex shrink-0 items-center rounded-xl" href="/">
          <BrandMark />
        </Link>

        <DesktopNav items={navigationItems} />

        <div className="hidden shrink-0 lg:block">
          <ScheduleVisitButton className="rounded-xl px-5 text-sm" />
        </div>

        <MobileMenu cta={<ScheduleVisitButton className="w-full justify-center" />} items={navigationItems} />
      </div>
    </header>
  );
}
