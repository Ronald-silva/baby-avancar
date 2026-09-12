"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { cn } from "@/shared/lib/cn";

export type NavigationItem = {
  href: string;
  label: string;
  external?: boolean;
};

type MobileMenuProps = {
  items: NavigationItem[];
  cta?: ReactNode;
};

export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = "mobile-navigation";

  return (
    // `lg:hidden` precisa casar com o breakpoint de exibição da nav desktop
    // em marketing-header.tsx (`lg:block`) — ver comentário lá.
    <div className="lg:hidden">
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        className="tap-target inline-flex items-center justify-center rounded-full border border-brand/15 bg-surface text-brand shadow-soft transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-brand hover:text-brand-foreground"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>

      <div
        className={cn(
          "fixed inset-x-4 top-20 z-50 origin-top rounded-3xl border border-white/70 bg-surface/95 p-3 shadow-glass backdrop-blur-glass transition-[opacity,transform] duration-200",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
        hidden={!isOpen}
        id={menuId}
      >
        {cta ? <div className="p-1 pb-2">{cta}</div> : null}
        <nav aria-label="Navegação móvel">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  className="tap-target flex items-center rounded-2xl px-4 py-3 font-semibold text-ink transition-[background-color,color] hover:bg-brand hover:text-brand-foreground"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  target={item.external ? "_blank" : undefined}
                >
                  {item.label}
                  {item.external ? <span className="ml-1 text-sm" aria-hidden="true">↗</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
