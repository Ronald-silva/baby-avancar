import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { cn } from "@/shared/lib/cn";
import { SITE_URL } from "@/shared/config/site";
import { FAVICON_APPLE_TOUCH, FAVICON_ICON_16, FAVICON_ICON_32, FAVICON_ICON_48 } from "@/shared/ui/brand-mark";
import "./globals.css";

const fraunces = Fraunces({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
});

const nunitoSans = Nunito_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "600", "700", "800"],
});

// Imagem de Open Graph vem do file convention em opengraph-image.tsx
// (banner oficial em public/media/og.webp), não precisa ser listada aqui.
// Title/description da Home encurtados (auditoria de correções, item 21):
// versão anterior tinha 69/185 caracteres, acima do que o Google costuma
// exibir sem truncar (~60/~155-160). Mesma informação central (Colégio Baby
// Avançar, Infantil, Fundamental I, Fortaleza, turmas reduzidas) — só sem os
// nomes das duas unidades na description (continuam em Segmentos/Footer/
// JSON-LD, não é informação perdida, só não cabia no orçamento de caracteres
// do snippet de busca).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Colégio Baby Avançar | Infantil e Fundamental I em Fortaleza",
    template: "%s | Colégio Baby Avançar",
  },
  description:
    "Colégio Baby Avançar: Educação Infantil e Fundamental I em Fortaleza, com turmas reduzidas e acompanhamento próximo de cada aluno.",
  // Favicon é o selo oficial do colégio (ver brand-mark.tsx), exportado em
  // public/media/favicons/ nos tamanhos reais por consumidor: 16/32 (aba do
  // navegador), 48 (atalho/Windows), 180 (apple-touch-icon), 192/512
  // (manifest.ts, PWA/Android).
  icons: {
    icon: [
      { url: FAVICON_ICON_16, sizes: "16x16", type: "image/png" },
      { url: FAVICON_ICON_32, sizes: "32x32", type: "image/png" },
      { url: FAVICON_ICON_48, sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: FAVICON_APPLE_TOUCH, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Colégio Baby Avançar",
    url: "/",
    title: "Colégio Baby Avançar | Infantil e Fundamental I em Fortaleza",
    description:
      "Educação Infantil na unidade Jóquei Clube e Ensino Fundamental I na unidade João XXIII, em Fortaleza (CE).",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={cn(fraunces.variable, nunitoSans.variable)} lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
