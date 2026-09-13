import Image from "next/image";
import { cn } from "@/shared/lib/cn";

/**
 * Único ponto do projeto que conhece os caminhos dos arquivos de logo —
 * inclusive fora de UI renderizada (`icons`/`manifest` importam as
 * constantes daqui em vez de repetir o caminho). Nenhum outro lugar deve
 * ter esses caminhos escritos diretamente.
 *
 * `LOGO_SRC` (`public/media/babyavancar.png`) é a arte com fundo
 * transparente usada no BrandMark visual (Header/Footer/Hero).
 *
 * Favicon NÃO reusa nem o selo circular completo nem a arte transparente —
 * as duas têm detalhe/texto demais e ficam ilegíveis em 16-32px. É um
 * monograma dedicado ("BA" dourado sobre círculo azul da marca, as duas
 * cores reais do token system — nenhuma identidade nova), gerado nos
 * tamanhos que cada consumidor real precisa (ver ROADMAP.md/relatório do
 * ajuste de identidade visual para o motivo de cada tamanho existir).
 */
export const LOGO_SRC = "/media/babyavancar.png";
export const FAVICON_ICON_16 = "/media/favicon-16.png";
export const FAVICON_ICON_32 = "/media/favicon-32.png";
export const FAVICON_ICON_48 = "/media/favicon-48.png";
export const FAVICON_APPLE_TOUCH = "/media/apple-touch-icon.png";
export const FAVICON_ICON_192 = "/media/icon-192.png";
export const FAVICON_ICON_512 = "/media/icon-512.png";

type BrandMarkProps = {
  className?: string;
  imageClassName?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  /** Só `true` para a instância acima da dobra (Header) — evita competir pelo LCP em usos abaixo da dobra (ex.: Footer). */
  priority?: boolean;
};

// Tamanho padrão subiu de 44→56px: a marca estava com pouca presença no
// Header/Footer (44px é pequeno demais pro peso visual que o selo tem —
// muito espaço negativo ao redor, "sumindo" ao lado do wordmark). 56px dá
// presença real sem exagerar; Header (80px de altura útil) e Footer (sem
// restrição de altura) comportam isso com folga.
export function BrandMark({ className, imageClassName, size = 56, showWordmark = true, wordmarkClassName, priority = false }: BrandMarkProps) {
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
        <span className={cn("font-display text-2xl font-semibold tracking-tight text-ink", wordmarkClassName)}>{"Baby Avançar"}</span>
      ) : null}
    </span>
  );
}
