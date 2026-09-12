import Image from "next/image";
import { cn } from "@/shared/lib/cn";

/**
 * Único ponto do projeto que conhece o caminho do arquivo de logo.
 *
 * `public/media/logo.png` é o arquivo OFICIAL da nova identidade (selo circular
 * CBA/Colégio Baby Avançar). Substituiu a logo antiga (`baby-avancar-logo.png`) nesta
 * rodada — a extração cromática de docs/DESIGN_SYSTEM.md ainda não foi refeita a partir
 * dele (ver relatório desta implementação). Se o arquivo mudar de novo, troque só o
 * `LOGO_SRC` abaixo; nenhum outro componente referencia este caminho diretamente.
 */
const LOGO_SRC = "/media/logo.png";

type BrandMarkProps = {
  className?: string;
  imageClassName?: string;
  size?: number;
  showWordmark?: boolean;
};

export function BrandMark({ className, imageClassName, size = 52, showWordmark = true }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        alt=""
        aria-hidden="true"
        className={cn("rounded-full object-contain", imageClassName)}
        height={size}
        priority
        src={LOGO_SRC}
        width={size}
      />
      {showWordmark ? (
        <span className="font-display text-2xl font-semibold tracking-tight text-ink">{"Baby Avançar"}</span>
      ) : null}
    </span>
  );
}
