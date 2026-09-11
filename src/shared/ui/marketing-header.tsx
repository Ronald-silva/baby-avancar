import Image from "next/image";
import Link from "next/link";
import { MobileMenu, type NavigationItem } from "@/shared/ui/mobile-menu";

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Início" },
  { href: "/acesso", label: "Acesso à plataforma" },
  { href: "https://wa.me/5585999701822", label: "Falar com a escola", external: true },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand/10 bg-canvas/85 backdrop-blur-glass">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-5 py-2 sm:px-8">
        <Link aria-label="Colégio Baby Avançar — página inicial" className="tap-target inline-flex items-center gap-3 rounded-xl" href="/">
          <Image
            alt="Logotipo do Colégio Baby Avançar"
            height={200}
            priority
            sizes="52px"
            src="/media/baby-avancar-logo.png"
            width={200}
            className="h-11 w-11 rounded-xl object-contain sm:h-12 sm:w-12"
          />
          <span className="font-display text-xl font-bold tracking-tight text-ink">Baby Avançar</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="tap-target inline-flex items-center rounded-full px-4 py-2 font-semibold text-ink transition-[background-color,color] hover:bg-brand hover:text-brand-foreground"
                  href={item.href}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  target={item.external ? "_blank" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu items={navigationItems} />
      </div>
    </header>
  );
}
