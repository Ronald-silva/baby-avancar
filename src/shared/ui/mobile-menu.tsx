"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Fechar ao clicar fora e ao pressionar Escape — nenhum dos dois existia
  // (só fechava clicando num link ou no próprio trigger de novo). Sem isso,
  // o menu ficava aberto indefinidamente nesses dois casos, o que parecia
  // "estilo preso" no QA manual mas era o menu genuinamente ainda aberto.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    // `lg:hidden` precisa casar com o breakpoint de exibição da nav desktop
    // em marketing-header.tsx (`lg:block`) — ver comentário lá.
    <div className="lg:hidden" ref={containerRef}>
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        className={cn(
          "tap-target inline-flex items-center justify-center rounded-full border shadow-soft transition-[background-color,color,border-color,transform] duration-150 active:scale-95",
          // `hover:` puro gruda em touch (sem mouse não existe "sair do hover" —
          // o navegador aplica no toque e só limpa num toque seguinte em outro
          // lugar, deixando o botão "azul preso"). `[@media(hover:hover)]:`
          // restringe o hover a ponteiros que realmente suportam hover (mouse/
          // trackpad) — comportamento desktop preservado, touch nunca gruda.
          "[@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:bg-brand [@media(hover:hover)]:hover:text-brand-foreground",
          isOpen ? "border-brand/30 bg-brand/10 text-brand" : "border-brand/15 bg-surface text-brand",
        )}
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
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
