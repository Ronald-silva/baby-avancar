// Fonte única dos dados institucionais usados no marketing (Header, Hero e afins).
// Fase 1 do ROADMAP trata isto como módulo de constantes; migra para o backend na Fase 3
// sem mudar quem consome (ver ROADMAP.md, "Fonte única de dados institucionais").

export const SITE = {
  name: "Baby Avançar",
  legalName: "Colégio Baby Avançar",
  whatsappNumber: "5585999701822",
} as const;

/**
 * As duas unidades do Colégio Baby Avançar — nenhuma é "sede" da identidade,
 * a marca é única e global (ver ROADMAP.md, Fase 1 / Bloco 2).
 */
export const UNITS = {
  infantil: {
    label: "Educação Infantil",
    name: "Unidade Jóquei Clube",
    street: "Rua Silveira Filho, 375",
    neighborhood: "Jóquei Clube",
  },
  fundamental: {
    label: "Fundamental I",
    name: "Unidade João XXIII",
    street: "Rua Perdigão de Oliveira, 1241",
    neighborhood: "João XXIII",
    landmark: "bem próximo à Praça do João XXIII",
  },
} as const;

/** Mensagens reais já usadas no site legado (index.html) — nenhuma foi inventada. */
export const WHATSAPP_MESSAGES = {
  scheduleVisit: "Olá! Gostaria de agendar uma visita ao Colégio Baby Avançar.",
  generalContact: "Olá! Gostaria de conhecer mais sobre o Colégio Baby Avançar.",
} as const;

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
