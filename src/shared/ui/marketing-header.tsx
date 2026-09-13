import Link from "next/link";
import { BrandMark } from "@/shared/ui/brand-mark";
import { Button } from "@/shared/ui/button";
import { DesktopNav } from "@/shared/ui/desktop-nav";
import { MobileMenu, type NavigationItem } from "@/shared/ui/mobile-menu";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/shared/config/site";

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Início" },
  { href: "/#segmentos", label: "Segmentos" },
  { href: "/#atividades", label: "Atividades" },
  { href: "/#prova-social", label: "Depoimentos" },
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
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-50 focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-foreground"
        href="#conteudo-principal"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link aria-label="Colégio Baby Avançar — página inicial" className="tap-target inline-flex shrink-0 items-center rounded-xl" href="/">
          <BrandMark priority />
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
