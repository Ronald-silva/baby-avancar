// Fonte única dos dados institucionais usados no marketing (Header, Hero e afins).
// Fase 1 do ROADMAP trata isto como módulo de constantes; migra para o backend na Fase 3
// sem mudar quem consome (ver ROADMAP.md, "Fonte única de dados institucionais").

export const SITE = {
  name: "Baby Avançar",
  legalName: "Colégio Baby Avançar",
  whatsappNumber: "5585999701822",
} as const;

/** Mensagens reais já usadas no site legado (index.html) — nenhuma foi inventada. */
export const WHATSAPP_MESSAGES = {
  scheduleVisit: "Olá! Gostaria de agendar uma visita ao Colégio Baby Avançar.",
  generalContact: "Olá! Gostaria de conhecer mais sobre o Colégio Baby Avançar.",
} as const;

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
