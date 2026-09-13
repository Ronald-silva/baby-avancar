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
 * Favicon usa o selo oficial (mesmo símbolo do `LOGO_SRC`/selo circular),
 * exportado em `public/media/favicons/` nos tamanhos reais que cada
 * consumidor precisa (16/32/48 navegador, 180 Apple touch, 192/512
 * manifest/PWA) — substituiu o monograma "BA" provisório usado antes do
 * selo oficial chegar (auditoria de correções, item 4). `apple-touch-
 * icon.png` foi achatado sobre fundo branco opaco nessa mesma pasta (fundo
 * transparente original virava quadrado preto no iOS, que não respeita
 * alpha em ícone de tela de início) — mesmo símbolo, nenhum pixel do selo
 * alterado, só o canal alpha removido.
 */
export const LOGO_SRC = "/media/babyavancar.png";
export const FAVICON_ICON_16 = "/media/favicons/favicon-16x16.png";
export const FAVICON_ICON_32 = "/media/favicons/favicon-32x32.png";
export const FAVICON_ICON_48 = "/media/favicons/favicon-48x48.png";
export const FAVICON_APPLE_TOUCH = "/media/favicons/apple-touch-icon.png";
export const FAVICON_ICON_192 = "/media/favicons/icon-192x192.png";
export const FAVICON_ICON_512 = "/media/favicons/icon-512x512.png";

type BrandMarkProps = {
  className?: string;
  imageClassName?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

// Tamanho padrão subiu de 44→56px: a marca estava com pouca presença no
// Header/Footer (44px é pequeno demais pro peso visual que o selo tem —
// muito espaço negativo ao redor, "sumindo" ao lado do wordmark). 56px dá
// presença real sem exagerar; Header (80px de altura útil) e Footer (sem
// restrição de altura) comportam isso com folga.
//
// Sem preload/fetchPriority mesmo no Header (acima da dobra): a foto do
// Hero (941×1672, ocupando a maior parte da viewport) é sempre o real
// candidato a LCP da Home — um selo de 56px preloadado só rouba banda da
// imagem que de fato precisa chegar primeiro (auditoria SEO, item 31).
export function BrandMark({ className, imageClassName, size = 56, showWordmark = true, wordmarkClassName }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        alt=""
        aria-hidden="true"
        className={cn("object-contain", imageClassName)}
        height={size}
        src={LOGO_SRC}
        width={size}
      />
      {showWordmark ? (
        <span className={cn("font-display text-2xl font-semibold tracking-tight text-ink", wordmarkClassName)}>{"Baby Avançar"}</span>
      ) : null}
    </span>
  );
}
