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

// Sem imagem própria de Open Graph (1200x630) ainda — nenhum asset atual tem
// a proporção adequada (ver relatório do Bloco 4). Pendência documentada, não
// geramos uma imagem improvisada só para preencher o checklist.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Colégio Baby Avançar — Educação Infantil e Fundamental I em Fortaleza",
    template: "%s | Colégio Baby Avançar",
  },
  description:
    "Colégio Baby Avançar: Educação Infantil na unidade Jóquei Clube e Ensino Fundamental I na unidade João XXIII, em Fortaleza (CE). Turmas reduzidas e acompanhamento próximo de cada aluno.",
  // Favicon é um monograma dedicado ("BA" sobre círculo azul da marca),
  // não o selo completo nem o BrandMark transparente — ver brand-mark.tsx.
  // Tamanhos reais por consumidor: 16/32 (aba do navegador), 48 (atalho/
  // Windows), 180 (apple-touch-icon), 192/512 (manifest.ts, PWA/Android).
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
    title: "Colégio Baby Avançar — Educação Infantil e Fundamental I em Fortaleza",
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
