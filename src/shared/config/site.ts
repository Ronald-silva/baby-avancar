// Fonte única dos dados institucionais usados no marketing (Header, Hero e afins).
// Fase 1 do ROADMAP trata isto como módulo de constantes; migra para o backend na Fase 3
// sem mudar quem consome (ver ROADMAP.md, "Fonte única de dados institucionais").

/**
 * URL pública desta aplicação Next.js (para metadata, canonical, sitemap e OG).
 * Nenhum domínio próprio foi definido ainda (ROADMAP.md, ADR-004) — o fallback é a
 * URL do Railway já validada em produção (ADR-012). Defina `NEXT_PUBLIC_SITE_URL`
 * assim que houver domínio próprio; nenhum outro arquivo deve precisar mudar.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://baby-avancar-production.up.railway.app";

export const SITE = {
  name: "Baby Avançar",
  legalName: "Colégio Baby Avançar",
  whatsappNumber: "5585999701822",
  /** Confirmado no JSON-LD do site legado (index.html, `sameAs`). */
  instagramUrl: "https://www.instagram.com/colegiobabyavancar_oficial/",
  tagline: "Avançando e transformando o Conhecimento",
} as const;

/**
 * As duas unidades do Colégio Baby Avançar — nenhuma é "sede" da identidade,
 * a marca é única e global (ver ROADMAP.md, Fase 1 / Bloco 2).
 * `addressLocality`/`addressRegion` confirmados no JSON-LD do site legado (index.html, `address`).
 */
export const UNITS = {
  infantil: {
    label: "Educação Infantil",
    name: "Unidade Jóquei Clube",
    street: "Rua Silveira Filho, 375",
    neighborhood: "Jóquei Clube",
    addressLocality: "Fortaleza",
    addressRegion: "CE",
  },
  fundamental: {
    label: "Fundamental I",
    name: "Unidade João XXIII",
    street: "Rua Perdigão de Oliveira, 1241",
    neighborhood: "João XXIII",
    addressLocality: "Fortaleza",
    addressRegion: "CE",
    landmark: "bem próximo à Praça do João XXIII",
  },
} as const;

/** Endereço completo para exibição (conteúdo visível, Footer, seção Unidades) — sempre com cidade/UF. */
export function formatUnitAddress(unit: { street: string; neighborhood: string; addressLocality: string; addressRegion: string }): string {
  return `${unit.street} – ${unit.neighborhood}, ${unit.addressLocality} – ${unit.addressRegion}`;
}

/** Mensagens reais já usadas no site legado (index.html) — nenhuma foi inventada. */
export const WHATSAPP_MESSAGES = {
  scheduleVisit: "Olá! Gostaria de agendar uma visita ao Colégio Baby Avançar.",
  generalContact: "Olá! Gostaria de conhecer mais sobre o Colégio Baby Avançar.",
} as const;

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Link de busca do Google Maps a partir de um endereço real — nunca coordenadas inventadas. */
export function buildMapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
