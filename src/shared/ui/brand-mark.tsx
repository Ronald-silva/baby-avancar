import Image from "next/image";
import { cn } from "@/shared/lib/cn";

/**
 * Único ponto do projeto que conhece os caminhos dos arquivos de logo —
 * inclusive fora de UI renderizada (ex.: `icons` do metadata em layout.tsx
 * importa `FAVICON_SRC` daqui em vez de repetir o caminho). Nenhum outro
 * lugar deve ter esses caminhos escritos diretamente.
 *
 * `LOGO_SRC` (`public/media/babyavancar.png`) é a arte com fundo transparente
 * usada no BrandMark visual (Header/Footer) — substitui o selo circular
 * antigo nesta rodada. `FAVICON_SRC` continua apontando pro selo circular
 * antigo (`public/media/logo.png`, com disco branco): a arte nova preenche
 * quase todo o canvas 1254×1254 (sem margem/contenção circular) e fica
 * ilegível/sem contorno em 16-32px — não é um bom favicon, então o favicon
 * NÃO foi trocado (ver relatório do ajuste de identidade visual).
 */
export const LOGO_SRC = "/media/babyavancar.png";
export const FAVICON_SRC = "/media/logo.png";

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
        className={cn("object-contain", imageClassName)}
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
