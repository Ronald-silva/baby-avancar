import type { Metadata } from "next";

// Fronteira arquitetural da Plataforma de Mapeamento de Talentos (Fase 4/5).
// `robots` aqui vale por padrão para toda a subárvore /plataforma/* futura —
// área de aplicação, não conteúdo institucional a ser indexado.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PlataformaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
