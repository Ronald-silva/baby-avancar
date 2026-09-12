"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import type { NavigationItem } from "@/shared/ui/mobile-menu";

// Âncoras (/#proposta, /#atividades) ainda não têm seção real para fazer scroll-spy —
// o estado ativo aqui compara apenas o pathname, então esses itens nunca acendem até
// as seções correspondentes existirem (ver comentário em marketing-header.tsx).
function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === pathname;
}

export function DesktopNav({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação principal" className="hidden lg:block">
      <ul className="flex items-center gap-7">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex items-center whitespace-nowrap px-2 py-2 text-[15px] font-medium leading-6 transition-colors duration-200",
                  "after:absolute after:inset-x-2 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-brand after:transition-transform after:duration-200 after:content-['']",
                  "text-ink hover:text-brand hover:after:scale-x-100",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
