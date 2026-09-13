// Fonte única dos dados institucionais usados no marketing (Header, Hero e afins).
// Fase 1 do ROADMAP trata isto como módulo de constantes; migra para o backend na Fase 3
// sem mudar quem consome (ver ROADMAP.md, "Fonte única de dados institucionais").

/**
 * URL pública e CANÔNICA desta aplicação (para metadata, canonical, sitemap,
 * robots e JSON-LD). Domínio oficial adquirido — ver ROADMAP.md, ADR-004/015.
 *
 * O domínio do Railway (`baby-avancar-production.up.railway.app`) é só
 * ambiente técnico de validação: é aceitável acessá-lo para QA depois do
 * deploy, mas o HTML servido por ele deve continuar anunciando este domínio
 * como canonical — nunca o contrário. Não usar `NEXT_PUBLIC_SITE_URL` para
 * apontar de volta para o Railway ou para o domínio antigo da Vercel.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://babyavancar.com.br";

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
 *
 * Chaveado por UNIDADE, não por segmento (correção de fato institucional):
 * a estrutura anterior (`infantil`/`fundamental` como chaves) embutia a
 * suposição errada de que cada unidade atende exatamente um segmento. Real:
 * João XXIII atende os DOIS segmentos (Infantil e Fundamental I); só Jóquei
 * Clube atende exclusivamente Infantil. `label` descreve os segmentos reais
 * de cada unidade, não é mais um segmento com uma unidade anexada.
 */
export const UNITS = {
  joqueiClube: {
    label: "Educação Infantil",
    name: "Unidade Jóquei Clube",
    street: "Rua Silveira Filho, 375",
    neighborhood: "Jóquei Clube",
    addressLocality: "Fortaleza",
    addressRegion: "CE",
  },
  joaoXXIII: {
    label: "Educação Infantil e Fundamental I",
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
