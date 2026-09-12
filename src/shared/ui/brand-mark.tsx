import Image from "next/image";
import { cn } from "@/shared/lib/cn";

/**
 * Único ponto do projeto que conhece o caminho do arquivo de logo — inclusive
 * fora de UI renderizada (ex.: `icons` do metadata em layout.tsx importa
 * `LOGO_SRC` daqui em vez de repetir o caminho). Nenhum outro lugar deve ter
 * o caminho do arquivo escrito diretamente.
 *
 * `public/media/logo.png` é o arquivo OFICIAL da nova identidade (selo circular
 * CBA/Colégio Baby Avançar). Substituiu a logo antiga (`baby-avancar-logo.png`) nesta
 * rodada — a extração cromática de docs/DESIGN_SYSTEM.md ainda não foi refeita a partir
 * dele (ver relatório desta implementação). Se o arquivo mudar de novo, troque só aqui.
 */
export const LOGO_SRC = "/media/logo.png";

type BrandMarkProps = {
  className?: string;
  imageClassName?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  /** Só `true` para a instância acima da dobra (Header) — evita competir pelo LCP em usos abaixo da dobra (ex.: Footer). */
  priority?: boolean;
};

export function BrandMark({ className, imageClassName, size = 44, showWordmark = true, wordmarkClassName, priority = false }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        alt=""
        aria-hidden="true"
        className={cn("rounded-full object-contain", imageClassName)}
        height={size}
        priority={priority}
        src={LOGO_SRC}
        width={size}
      />
      {showWordmark ? (
        <span className={cn("font-display text-xl font-semibold tracking-tight text-ink", wordmarkClassName)}>{"Baby Avançar"}</span>
      ) : null}
    </span>
  );
}
